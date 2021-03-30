<template>
    <v-container fluid class="">
        <div class="pb-3">
            <b-button @click="showModal">Add Product</b-button>
        </div>
        <table class="table table-bordered table-responsive-sm">
            <thead>
            <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Product Type</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="inventoryItem in inventory" :key="inventoryItem.productID">
                <td class="w-25">
                    <b-img-lazy class="img-fluid img-thumbnail" :src=inventoryItem.thumbnailURL
                                alt="Dripy"></b-img-lazy>
                </td>
                <td>{{inventoryItem.productName}}</td>
                <td>{{inventoryItem.productDescription}}</td>
                <td>{{inventoryItem.productType.productTypeName}}</td>
                <td>
                    <b-button class="w-100" @click="showModal(inventoryItem)">Edit</b-button>
                </td>
            </tr>
            </tbody>
        </table>

        <b-modal ref="my-modal" size="lg" hide-footer title="Inventory">
            <div class="row">
                <div class="col-sm-10 offset-sm-1">
                    <form id="register-form" role="form">
                        <h3 v-if="!product.productID" class="text-center">Add New Product</h3>
                        <h3 v-if="product.productID" class="text-center">Edit Product</h3>
                        <div class="form-group" :class="{ 'form-group--error': $v.product.productName.$error }">
                            <label for="productName">Product Name</label>
                            <input type="text" required="required" name="productName" id="productName"
                                   class="form-control mb-3"
                                   placeholder="Product Name"
                                   value=""
                                   v-model="product.productName">
                            <div class="error text-danger" v-if="!$v.product.productName.required">Product Name is
                                required
                            </div>
                        </div>

<!--                        <div class="form-group" :class="{ 'form-group&#45;&#45;error': $v.firstName.$error }">-->
<!--                            <label for="firstName">First Name</label>-->
<!--                            <input type="text" required="required" name="email" id="firstName" class="form-control mb-3"-->
<!--                                   placeholder="First Name"-->
<!--                                   value=""-->
<!--                                   v-model="firstName">-->
<!--                            <div class="error text-danger" v-if="!$v.firstName.required">First Name is required</div>-->
<!--                        </div>-->

                        <div class="form-group">
                            <label for="productDescription">Product Description</label>
                            <input type="text" required="required" name="productDescription" id="productDescription"
                                   class="form-control mb-3"
                                   placeholder="Product Description"
                                   value=""
                                   v-model="product.productDescription">
                            <div class="error text-danger" v-if="!$v.product.productDescription.required">Product
                                Description is required
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Product Type</label>
                            <b-form-select v-model="product.gender" class="mb-3">
                                <b-form-select-option value="unisex">Unisex</b-form-select-option>
                                <b-form-select-option value="male">Male</b-form-select-option>
                                <b-form-select-option value="female">Female</b-form-select-option>
                                <b-form-select-option value="boys">Boys</b-form-select-option>
                                <b-form-select-option value="girls">Girls</b-form-select-option>

                            </b-form-select>
                        </div>
                        <div class="form-group">
                            <label>Product Type</label>
                            <b-form-select v-model="product.productType" class="mb-3">
                                <b-form-select-option v-for="prodType in productTypes"
                                                      :key="prodType" :value="prodType">{{prodType.productTypeName}}
                                </b-form-select-option>
                            </b-form-select>
                        </div>
                        <div v-if="!product.productID" class="form-group">
                            <label>Main Image (Mandatory)</label>
                            <image-uploader
                                    :preview="true"
                                    :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                                    capture="environment"
                                    :debug="1"
                                    maxHeight="2000px"
                                    :quality="1"
                                    maxSize="0.070"
                                    outputFormat="blob"
                                    @input="setImage"
                                    v-model="product.mainImage"
                                    :state="Boolean(product.mainImage)"
                                    accept="image/*">
                            </image-uploader>
                        </div>
                        <div v-if="product.productType" class="form-group">
                            <label>Stock</label>
                            <table class="table table-bordered table-responsive-sm">
                                <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Stock</th>
                                    <th>Price</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="size in product.productType.sizes" :key=size>
                                    <td>{{size.size}}</td>
                                    <td><input type="number" required="required" name="stock" id="stock"
                                               class="form-control mb-3"
                                               placeholder="Stock"
                                               value=""
                                               v-model="size.stock"></td>
                                    <td><input type="number" required="required" name="stock" id="price"
                                               class="form-control mb-3"
                                               placeholder="Price"
                                               value=""
                                               v-model="size.price"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div v-if="!product.productID" class="form-group">
                            <button class="btn btn-success" style="width: 100%" @click.prevent="saveProductLocal"
                                    :disabled="this.isSaving">
                                <i v-if="this.isSaving" class="fa fa-spinner fa-spin"/>
                                Add
                            </button>
                        </div>
                        <div v-if="product.productID" class="form-group">
                            <button class="btn btn-success" style="width: 100%" @click.prevent="updateProductLocal"
                                    :disabled="this.isSaving">
                                <i v-if="this.isSaving" class="fa fa-spinner fa-spin"/>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="px-2">
                <b-button variant="outline-info" class="mr-2" @click="hideModal">Save</b-button>
                <b-button variant="outline-danger" class="mr-2" @click="toggleModal">Close</b-button>
            </div>

        </b-modal>

    </v-container>
</template>

<script>
    import {required} from "vuelidate/lib/validators";
    import {mapActions, mapGetters} from "vuex";
    import * as firebase from "firebase";
    import * as moment from "moment";

    export default {
        name: "Inventory",
        methods: {
            ...mapActions(['getInventory', 'saveInventory', 'updateInventory', 'getProductTypes', 'getBrandByID', 'getProductDocReferenceBeforeSave']),
            showModal(product) {
                if (product) {
                    this.product = product;
                }
                this.$refs['my-modal'].show()
            },
            hideModal() {
                this.$refs['my-modal'].hide()
            },
            toggleModal() {
                this.$refs['my-modal'].toggle('#toggle-btn')
            },
            async saveProductLocal() {
                this.isSaving = true;
                this.product.brandID = this.brand.brandID;
                this.product.brandName = this.brand.brandName;
                this.product.ownerID = this.user.uid;
                this.product.verified = false;
                const that = this;

                this.getProductDocReferenceBeforeSave().then(results => {
                    console.log('REF', results);
                    that.product.docID = results.id;
                    // Create a root reference
                    console.log(that.product.mainImage);
                    const uploadTask = firebase.storage().ref(that.product.brandID + '/' + moment().unix() + '_thumbnail')
                        .put(that.product.mainImage);

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
                        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            console.log('File available at', downloadURL);
                            console.log('Brand', that.product);

                            that.product.thumbnailURL = downloadURL;
                            that.saveInventory(that.product).then(res => {
                                console.log(res)
                                that.uploadingStatus = false
                                that.isSaving = false;
                                that.hideModal();
                            })
                        })
                    });
                })

            },
            updateProductLocal() {
                this.updateInventory(this.product);
                this.hideModal();
            },
            onFileChange(e) {
                this.product.mainImage = e.target.files[0];
                const file = e.target.files[0];
                console.log(file)
                this.url = URL.createObjectURL(file);
            },
            setImage: function (output) {
                this.product.mainImage = output;
                console.log('Info', output.info)
                console.log('Exif', output.exif)
            }

        }
        ,
        computed: {
            ...
                mapGetters(['brand', 'user', 'inventory', 'productTypes']),
        }
        ,
        created() {
            this.getBrandByID(this.user.uid);
            this.getInventory(this.user.uid);
            this.getProductTypes();
        }
        ,
        validations: {
            product: {
                productName: {required}
                ,
                productDescription: {required}
                ,
                brandName: {required}
                ,
                gender: {required}
            }
        }
        ,
        data() {
            return {
                product: {
                    productName: '',
                    brandName: '',
                    productDescription: '',
                    productDetails: [],
                    reviews: [],
                    inventory: [],
                    productID: '',
                    brandID: '',
                    ownerID: '',
                    verified: false,
                    mainImage: '',
                    supportImage1: '',
                    supportImage2: '',
                    supportImage3: '',
                    supportImage4: ''
                },
                url: '',
                isSaving: false,
                hasImage: ''
            }
        }
    }
</script>

<style scoped>
    .img-preview {
        width: 250px !important;
    }
</style>
