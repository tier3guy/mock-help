import '@/app/globals.css';
import { inter } from "@/lib/fonts";
import Navbar from './components/navbar';
import Sidebar from "./components/sidebar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} w-screen h-screen overflow-hidden flex text-[#1F2245]`}>
                <div className="h-full overflow-auto w-1/6">
                    <Sidebar />
                </div>
                <div className="h-full flex-1 overflow-hidden flex flex-col">
                    <Navbar />
                    <div className='w-full flex-1 overflow-auto bg-[#F4F4F4] p-4'>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
