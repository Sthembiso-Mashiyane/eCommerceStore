<template>
    <div class="row">
        <div v-if="isBrandLoading" class="w-100">
            <grid-loader :loading="isBrandLoading"></grid-loader>
        </div>
        <div v-if="!isBrandLoading" class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
            <div class="card mb-3">
                <div class="card-body">
                    <form id="register-form" role="form">
                        <h3 class="text-center">Brand Details</h3>
                        <div class="form-group">
                            <label for="brandName">Brand Name</label>
                            <input type="text" required="required" name="brandName" id="brandName"
                                   class="form-control mb-3"
                                   placeholder="Brand Name"
                                   value=""
                                   v-model="brand.brandName">
                            <div class="error text-danger" v-if="!$v.brand.brandName.required">Product Name is required
                            </div>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.brand.brandDescription.$error }">
                            <label for="brandDescription">Brand Description </label>
                            <input type="email" required="required" name="brandDescription" id="brandDescription"
                                   class="form-control mb-3"
                                   placeholder="Brand Description"
                                   value=""
                                   v-model="brand.brandDescription">
                            <div class="error text-danger" v-if="!$v.brand.brandDescription.required">Product
                                Description is
                                required
                            </div>
                        </div>


                        <div class="form-group">
                            <b-form-file
                                    v-model="brand.brandLogo"
                                    :state="Boolean(brand.brandLogo)"
                                    placeholder="Choose a file"
                                    @change="onFileChange"
                            ></b-form-file>
                            <div id="preview" class="pt-5">
                                <img v-if="url || brand.logoURL" :src="url || brand.logoURL"/>
                            </div>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.brand.brandTelNumber.$error }">
                            <label for="brandTelNumber">Phone Number</label>
                            <input type="number" required="required" name="brandTelNumber" id="brandTelNumber"
                                   class="form-control mb-3"
                                   placeholder="Telephone Number"
                                   value=""
                                   v-model="brand.brandTelNumber">
                            <div class="error text-danger" v-if="!$v.brand.brandTelNumber.required">Phone Number is
                                required
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="brandEmail">Email</label>
                            <input type="brandEmail" required="required" name="brandEmail" id="brandEmail"
                                   class="form-control mb-3"
                                   placeholder="Email Address"
                                   value=""
                                   v-model="brand.brandEmail">
                            <div class="error text-danger" v-if="!$v.brand.brandEmail.required">Email Address is
                                required
                            </div>
                            <div class="error text-danger" v-if="!$v.brand.brandEmail">Please enter a valid email
                                address.
                            </div>
                        </div>
                        <div v-if="!brand.brandID" class="form-group">
                            <button class="btn btn-success" style="width: 100%" @click.prevent="saveBrandLocal"
                                    :disabled="uploadingStatus">
                                <i v-if="uploadingStatus" class="fa fa-spinner fa-spin"/>
                                Add
                            </button>
                        </div>
                        <div v-if="brand.brandID" class="form-group">
                            <button class="btn btn-success" style="width: 100%" @click.prevent="saveBrandLocal"
                                    :disabled="uploadingStatus">
                                <i v-if="uploadingStatus" class="fa fa-spinner fa-spin"/>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {maxLength, minLength, required} from "vuelidate/lib/validators";
    import * as firebase from "firebase";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "BrandProfile",
        data() {
            return {
                url: '',
                uploadValue: '',
                logoURL: '',
                uploadingStatus: false
            }
        },
        computed: {
            ...mapGetters(['user', 'brand', 'isBrandLoading'])
        },
        validations: {
            brand: {
                brandName: {required},
                brandTelNumber: {required, maxLength: maxLength(10), minLength: minLength(10)},
                brandEmail: {required},
                brandDescription: {required},
            }
        },
        created() {
            this.getBrandByID(this.user.uid);
        },
        methods: {
            ...mapActions(['getBrandDocReferenceBeforeSave', 'saveBrand', 'addMessage', 'getBrandByID']),
            onFileChange(e) {
                this.brand.brandLogo = e.target.files[0];
                const file = e.target.files[0];
                this.url = URL.createObjectURL(file);
            },
            saveBrandLocal() {
                this.uploadingStatus = true
                const that = this;
                this.brand.ownerID = this.user.uid


                this.getBrandDocReferenceBeforeSave().then(results => {
                    console.log('REF', results);
                    that.brand.docID = results.id;
                    // Create a root reference
                    const uploadTask = firebase.storage().ref(that.brand.docID + '/' + 'logo/' + that.brand.brandLogo.name)
                        .put(that.brand.brandLogo);

                    uploadTask.on('state_changed', function (snapshot) {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {
                        throw error
                        // Handle unsuccessful uploads
                    }, function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            console.log('File available at', downloadURL);
                            console.log('Brand', that.brand);

                            that.brand.logoURL = downloadURL;
                            that.saveBrand(that.brand).then(res => {
                                console.log(res)
                                that.uploadingStatus = false

                                let message_obj = {
                                    message: "Brand Saved Successfully",
                                    messageClass: "success",
                                    autoClose: true
                                }
                                that.addMessage(message_obj);
                            })
                        })
                    });
                })
            }
        }
    }
</script>

<style scoped>
    #preview {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #preview img {
        max-width: 100%;
        max-height: 500px;
    }
</style>
