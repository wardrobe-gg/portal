"use client";

import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { CartItemType } from "@/lib/cartUtils";
import { removeFromCart } from "@/lib/cartUtils";


export default function Cart() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart]= useState<CartItemType[]>([])
    const [loadingCheckout, setLoadingCheckout] = useState(false);


    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
                <div className="relative cursor-pointer h-[55px] flex items-center justify-center border-4 border-custom-gray-medium">
                    <Image
                        src={'/icons/cart.png'}
                        width="49"
                        height="49"
                        className="h-[25px] w-[25px] aspect-square"
                        alt="Cart Icon"
                    />
                    {/* Cart count badge */}
                    {cart.length > 0 && (
                        <div className="absolute -top-[1rem] -right-[1rem] h-8 w-8 flex items-center justify-center text-lg">
                            <span className='font-mc'>{cart.length}</span>
                        </div>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent className="z-[10000] outline-none">
                <SheetHeader>
                    <SheetTitle className="text-3xl font-mc">Cart</SheetTitle>
                </SheetHeader>
                {/* Display cart items */}
                <div className='h-[81vh] overflow-y-scroll mt-[1.5rem] mb-[2rem]'>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className="py-2 flex w-full justify-between items-center">
                            <div className='flex flex-col'>
                                <p className="text-lg font-mc">{item.name}</p>
                                <p>${(item.cost / 100).toFixed(2)}</p>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(index)} className='outline-none'>Remove</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-lg font-mc">Your cart is empty</p>
                )}
                </div>
                {/* {cart.length > 0 && <button className={`w-full p-4 outline-none bg-gradient-to-t from-zinc-800 via-zinc-900 to-zinc-950 hover:from-custom-bpink border-2 border-[#41414A] hover:border-custom-bpink cursor-pointer shadow-ciwhite hover:shadow-cipink transform-all duration-150 font-mc text-xl`} onClick={handleCheckout}>
                    {loadingCheckout === false && (activeAccount?.user ? `Checkout $${(totalCost / 100).toFixed(2)}` : `Login to continue`)}
                    {loadingCheckout === true && <div className='flex items-center justify-center'><Loader2 className='mr-2 animate-spin' /> Loading</div>}
                </button>}*/}
            </SheetContent>
        </Sheet>
    )
}