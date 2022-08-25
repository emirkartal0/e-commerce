import React, { Fragment, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import db, { storage } from '../../Firebase'
import toast, { Toaster } from 'react-hot-toast';
import { v4 } from 'uuid'
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function AddCard() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState();
    /* const [imageUpload, setImageUpload] = useState({
        frontImage: null,
        backImage: null
    }); */
    const [imageURL, setImageURL] = useState({
        frontImage: '',
        backImage: ''
    })

    const uploadCard = () => {
        addDoc(collection(db, 'cards'), {
            title: title,
            imageURL: imageURL,
            price: price
        });
        toast.success('Successfully add Product!')
        handleOpen();
    }

    const handleFrontImage = (file) => {
        /* setImageUpload((prev) => ({
            ...prev, frontImage: file
        })) */
        const storageRef = ref(storage, `CardPictures/${file.name + v4()}`)
        if (file == null) return;

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case 'paused':
                        console.log('paused')
                        break;
                    case 'running':
                        console.log('running')
                        break;
                    default:
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('User doesnt have permission to access the object');
                        break;
                    case 'storage/canceled':
                        console.log('User canceled the upload')
                        break;
                    case 'storage/unkown':
                        console.log('Unknown error occurred, inspect error.serverResponse')
                        break;
                    default:
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageURL((prev) => ({
                        ...prev,
                        frontImage: downloadURL
                    }))
                    console.log(imageURL.frontImage)
                })
            }
        )
    }

    const handleBackImage = (file) => {
        /* setImageUpload((prev) => ({
            ...prev, backImage: file
        })) */
        const storageRef = ref(storage, `CardPictures/${file.name + v4()}`)
        if (file == null) return;

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case 'paused':
                        console.log('paused')
                        break;
                    case 'running':
                        console.log('running')
                        break;
                    default:
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('User doesnt have permission to access the object');
                        break;
                    case 'storage/canceled':
                        console.log('User canceled the upload')
                        break;
                    case 'storage/unkown':
                        console.log('Unknown error occurred, inspect error.serverResponse')
                        break;
                    default:
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageURL((prev) => ({
                        ...prev,
                        backImage: downloadURL
                    }))
                })
            }
        )
    }

    return (
        <div>
            <Fragment>
                <Button onClick={handleOpen} variant="text" color='indigo'>
                    Add Product
                </Button>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Add Product Section</DialogHeader>
                    <DialogBody divider>
                        <div className='flex flex-col gap-5 ml-16 mb-2 w-3/4'>
                            <Input onChange={(e) => setTitle(e.target.value)} variant="standard" label="Product Name" />
                            <div className='flex items-center mt-1'>
                                <label className="block">
                                    <span className="sr-only">Choose File</span>
                                    <input onChange={(e) => handleFrontImage(e.target.files[0])} type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <label className="block">
                                    <span className="sr-only">Choose File</span>
                                    <input onChange={(e) => handleBackImage(e.target.files[0])} type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                </label>
                            </div>
                            <Input onChange={(e) => setPrice(e.target.value)} variant="standard" type='number' label="Price" />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="blue" onClick={uploadCard}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
            <Toaster />
        </div>
    )
}

export default AddCard