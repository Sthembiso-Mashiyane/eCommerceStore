<template>
    <div v-if="isAddressesLoading" class="w-100">
        <grid-loader :loading="isAddressesLoading"></grid-loader>
    </div>
    <div v-else class="">
        <div class="tablist">
            <h3 class="text-center pb-2">Address Book</h3>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.accordion-new variant="info">Add New Address
                        <b-icon @click="deleteAddressLocal(addr)" icon=" plus-square"
                                class="pl-1 danger grow"></b-icon>
                    </b-button>
                </b-card-header>
                <b-collapse id="accordion-new" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <Address :isEdit="false"></Address>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1" v-for="addr in addresses" :key="addr">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle="'accordion-'+ addr.id" variant="info">{{addr.streetAddress}}
                        <b-icon @click="deleteAddressLocal(addr)" icon="x-square-fill"
                                class="danger move-right grow"></b-icon>
                    </b-button>
                </b-card-header>
                <b-collapse :id="'accordion-'+addr.id" accordion="my-accordion" variant="danger" role="tabpanel">
                    <b-card-body>
                        <Address :isEdit="true" :address="addr"></Address>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <div>
                <b-modal id="modal-deleteConfirmation" hide-footer>
                    <template v-slot:modal-title>
                        Address Delete Confirmation
                    </template>
                    <div class="d-block text-center">
                        <p>Are you sure you want to delete address {{toDelete.streetAddress}}</p>
                    </div>
                    <b-button class="mt-3 alert-danger" block @click="confirmDelete()">Delete</b-button>
                    <b-button class="mt-3 alert-light" block @click="$bvModal.hide('modal-deleteConfirmation')">Cancel
                    </b-button>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import Address from "./Address";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "AddressBook",
        components: {Address},
        computed: {
            ...mapGetters(['addresses', 'user', 'isAddressesLoading'])
        },
        methods: {
            ...mapActions(['getAddresses', 'deleteAddress']),
            deleteAddressLocal(address) {
                this.$bvModal.show('modal-deleteConfirmation')
                this.toDelete = address;
                let message_obj = {
                        message: "Address Deleted Successfully",
                    messageClass: "success",
                    autoClose: true
                }
                this.addMessage(message_obj);
            },
            confirmDelete() {
                this.deleteAddress({uid: this.user.uid, address: this.toDelete}).then(res => {
                    this.toDelete = {};
                    this.$bvModal.hide('modal-deleteConfirmation')
                    let message_obj = {
                        message: res.message,
                        messageClass: "danger",
                        autoClose: true
                    }
                    this.addMessage(message_obj);
                })

            },
        },
        created() {
            this.getAddresses(this.user.uid);
        },
        data() {
            return {
                toDelete: {},
            }
        }
    }
</script>

<style scoped>
    .move-right {
        position: absolute;
        right: 15px;
    }

    .grow {
        transition: all .2s ease-in-out;
    }

    .grow:hover {
        transform: scale(1.3);
    }
</style>
