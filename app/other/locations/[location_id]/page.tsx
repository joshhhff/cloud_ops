'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type LocationForm = {
    name: string;
    address1: string;
    address2: string;
    city: string;
    postcode: string;
    contact: string;
    hours: string;
    description: string;
};

export default function LocationPage() {
    const [form, setForm] = useState<LocationForm>({
        name: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        contact: '',
        hours: '',
        description: '',
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // TODO: Save logic here (API call)
        setTimeout(() => setSaving(false), 1000);
    };

    return (
        <div className="max-w-3xl mx-auto p-0 space-y-6">
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-4">
                    <Link href="/locations" className="inline-flex p-1">
                        <ArrowLeft />
                    </Link>
                    <h1 className="text-3xl font-bold">Location Details</h1>
                </div>
            </div>
            <Card>
                <CardContent className="p-6 space-y-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name">Location Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Manchester Warehouse"
                                />
                            </div>
                            <div>
                                <Label htmlFor="contact">Contact Number</Label>
                                <Input
                                    id="contact"
                                    name="contact"
                                    value={form.contact}
                                    onChange={handleChange}
                                    placeholder="e.g. 0161 123 4567"
                                />
                            </div>
                            <div>
                                <Label htmlFor="address1">Address Line 1</Label>
                                <Input
                                    id="address1"
                                    name="address1"
                                    value={form.address1}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="address2">Address Line 2</Label>
                                <Input
                                    id="address2"
                                    name="address2"
                                    value={form.address2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="postcode">Postcode</Label>
                                <Input
                                    id="postcode"
                                    name="postcode"
                                    value={form.postcode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="hours">Opening Hours</Label>
                                <Input
                                    id="hours"
                                    name="hours"
                                    value={form.hours}
                                    onChange={handleChange}
                                    placeholder="e.g. Mon-Fri 9am-5pm"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Short description"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Location'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}