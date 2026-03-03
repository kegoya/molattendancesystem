import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {products} from '@/routes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { create, store } from '@/routes/products';
import { Textarea } from '@/components/ui/textarea';
import { CircleAlert, InfoIcon } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: create().url,
    },
];


export default function Create() { 

const { data, setData, post, processing, errors } = useForm({
  name: '',
  price: '',
  description: '',
  featured_image: null as File | null,
})

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  post(store().url);
  console.log(data)
}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
                    <div >
                        {/* Display validation errors if any */}
                        {Object.keys(errors).length > 0 && (
                            <Alert>
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle>Errors!</AlertTitle>
                                <AlertDescription className='text-red-500'>
                                    <ul>
                                        {Object.entries(errors).map(([key, message]) => (
                                            <li key={key}>{message as string}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                    </div>
                    <div className='ml-auto'>
                    <Link href={products().url}><Button> Back to Product</Button></Link>
                    </div>
        
                    <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                            </CardHeader>
                            <CardContent> 
                                <form className="flex flex-col gap-4" autoComplete='off' onSubmit={handleSubmit}> 
                                <div className='grid gap-4'>
                                    <div className='grid gap-2'>
                                        <Label htmlFor="name">Product Name</Label>
                                        <Input id="name" placeholder="Product Name" type='text' value={data.name} onChange={(e) => setData('name', e.target.value)} autoFocus tabIndex={1}/>
                                         <InputError message={errors.name} />
                                    </div>
                                    <div className='grid gap-2'>
                                        <Label htmlFor="price">Price</Label>
                                        <Input id="price" placeholder="Price" type='text' value={data.price} onChange={(e) => setData('price', e.target.value)} autoFocus tabIndex={2} />
                                            <InputError message={errors.price} />
                                    </div>
                                    <div className='grid gap-2'>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea id="description" placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} autoFocus tabIndex={3}  />
                                            <InputError message={errors.description} />
                                    </div>
                                    <div className='grid gap-2'>
                                        <Label htmlFor="featured_image">Featured Image</Label>
                                        <Input id="featured_image" placeholder="Choose Product Image" name='featured_image' type='file' autoFocus tabIndex={4} />
                                        <InputError message={errors.featured_image} />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="mt-4 w-fit cursor-pointer"
                                        tabIndex={5}
                                        disabled={processing}
                                    >
                                        {processing && <Spinner />}
                                        Save Product
                                    </Button>
                                </div>
                                </form> 
                            </CardContent> 
                    </Card>
                    
                    
            </div>
        </AppLayout>
    );
}