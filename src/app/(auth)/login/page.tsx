"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";


const Logo = () => (
    <div className="flex items-center gap-2">
        <div className="bg-brand-blue rounded-lg p-1.5 size-10 flex items-center justify-center shadow-lg shadow-brand-blue/20">

        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">Legic</span>
    </div>
);

export default function LoginPage() {

    return (
        <div className="flex min-h-screen bg-white font-sans overflow-hidden">
            {/* Left Side (Form) */}
            <div className="flex-[1.4] flex flex-col p-6 lg:p-12 relative z-10 bg-white">
                <div className="flex justify-between items-center mb-16">
                    <Logo />
                    <p className="text-sm font-medium text-gray-500">
                        Ada Masalah Dengan Login?{" "}
                        <Link href="/signup" className="text-brand-blue font-bold hover:underline">
                            Tanya
                        </Link>
                    </p>
                </div>

                <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full px-4 lg:px-0">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Get Started Now</h1>
                        <p className="text-gray-500 text-base">Please enter your information to access your account.</p>
                    </div>

                    <div className="space-y-6">
                        <Button variant="outline" className="h-12 w-full border-gray-200 hover:bg-gray-50 font-semibold text-gray-700 transition-all flex items-center justify-center gap-3 rounded-xl border cursor-pointer text-sm">
                            <svg fill="#000000" width="800px" height="800px" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg"><path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" /></svg>
                            Log In with GitHub
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Side (Image/Mockup) */}
            <div className="hidden lg:flex flex-1 bg-brand-blue p-8 lg:p-16 relative overflow-hidden items-center justify-center">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl opacity-50" />

                <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight text-center max-w-lg drop-shadow-md">
                        The easiest way to take care of your patient
                    </h2>

                    {/* Dashboard Mockup Card with Enhanced Perspective */}
                    <div className="w-full mt-20 bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] p-8 relative ml-36 transform rotate-[6deg] border-[14px] border-white/20 backdrop-blur-md scale-110 origin-bottom-left">
                        <div className="flex gap-8 text-left">
                            {/* Sidebar Mockup */}
                            <div className="w-48 border-r border-gray-100 pr-6 space-y-8">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="bg-brand-blue rounded-lg p-1.5 size-7 flex items-center justify-center shadow-lg shadow-brand-blue/20">
                                        <div className="size-full border-2 border-white/40 rounded-sm" />
                                    </div>
                                    <span className="font-bold text-sm text-gray-900 tracking-tight">Xenityhealth</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-11 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center px-4 gap-3 shadow-sm shadow-brand-blue/5">
                                        <div className="size-5 rounded-full bg-brand-blue/40" />
                                        <div className="h-2 w-16 bg-brand-blue/60 rounded-full" />
                                    </div>
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className="h-11 flex items-center px-4 gap-3 opacity-30">
                                            <div className="size-5 rounded-full bg-gray-300" />
                                            <div className="h-2 w-20 bg-gray-200 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Mockup */}
                            <div className="flex-1 space-y-8 pt-4">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="h-7 w-32 bg-gray-900 rounded-xl" />
                                    <div className="flex gap-3">
                                        <div className="h-8 w-20 bg-brand-blue shadow-lg shadow-brand-blue/20 rounded-full flex items-center justify-center">
                                            <div className="h-1.5 w-10 bg-white/80 rounded-full" />
                                        </div>
                                        <div className="h-8 w-20 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center">
                                            <div className="h-1.5 w-10 bg-gray-300 rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="p-5 rounded-3xl border border-gray-50 space-y-4 bg-white shadow-xl shadow-gray-100/50">
                                        <div className="h-2 w-12 bg-gray-300 rounded-full" />
                                        <div className="h-8 w-20 bg-gray-900 rounded-xl" />
                                        <div className="h-2 w-24 bg-brand-blue/20 rounded-full" />
                                    </div>
                                    <div className="p-5 rounded-3xl border border-gray-50 space-y-4 bg-white shadow-xl shadow-gray-100/50 relative overflow-hidden">
                                        <div className="h-2 w-12 bg-gray-300 rounded-full" />
                                        <div className="h-8 w-20 bg-gray-900 rounded-xl" />
                                        <div className="h-12 w-20 absolute bottom-0 right-0 flex items-end gap-1 px-4 mb-2">
                                            <div className="flex-1 h-[40%] bg-brand-blue/10 rounded-t-sm" />
                                            <div className="flex-1 h-[90%] bg-brand-blue/40 rounded-t-sm" />
                                            <div className="flex-1 h-[60%] bg-brand-blue/20 rounded-t-sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-[2.5rem] border border-gray-50 space-y-6 bg-white shadow-xl shadow-gray-100/50">
                                    <div className="flex justify-between items-center">
                                        <div className="h-3 w-28 bg-gray-900 rounded-full" />
                                        <div className="h-2 w-20 bg-gray-100 rounded-full" />
                                    </div>
                                    <div className="h-40 w-full bg-gray-50/50 rounded-3xl relative overflow-hidden flex items-end px-4 pb-4 gap-2">
                                        {[...Array(14)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 rounded-t-md transition-all duration-500 hover:opacity-100"
                                                style={{
                                                    height: `${10 + Math.random() * 80}%`,
                                                    backgroundColor: i % 4 === 0 ? 'var(--color-brand-blue)' : '#e5e7eb',
                                                    opacity: i % 4 === 0 ? 0.7 : 0.8
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
