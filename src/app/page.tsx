import Link from "next/link";
import { Suspense } from "react";

import { type RouterOutputs, api } from "trpc-api";
import { ServerForm } from "./server-form";

import { AuthShowcase } from "./auth-showcase";
import { date } from "zod";

export default async function HomePage() {
  // const data = await api.client.create.mutate({
  //   lName:"smith", 
  //   fName:"john", 
  //   address:"right next to you bro", 
  //   contactNumber:"04837497",
  //   email:"johnsmith@gmail.com", 
  //   businessId:"clnqycq3j0006u8g59751w6i5"
  // })
  // const data = await api.business.create.mutate({
  //   logo:"the logo of painthouse", 
  //   name:"painthouse", 
  //   address:"it is next to that house",
  //   contactNumber:"048473837",
  //   email:"info@painthouse.com.au"})
// const data = await api.invoice.create.mutate({
//   businessId:"clnqycq3j0006u8g59751w6i5",
//   clientId:"clnqyexhl000eu8g5adaxc17a",
//   items:[
//     {sno:1,desc:"brush",qty:2,rate:20}
//     ,{sno:2,desc:"paint",qty:3,rate:10},
//     {sno:3,desc:"paper",qty:4,rate:5}],
//     dueDate:new Date("2023-10-15T04:16:03.849Z"),
//     quote:true})

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-16">
      <div className="container flex flex-col items-center gap-12 px-4 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-purple-400">invo</span> App
        </h1>
        <div className="bg-gray-50 px-5 py-10 rounded-lg">
          <h3 className="text-3xl text-slate-800"></h3>
        </div>
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          {/** @ts-expect-error - Async Server Component */}
          <AuthShowcase />

          <div className="flex h-max items-start justify-start gap-2">
            <ServerForm />
          </div>
        </div>
      </div>
    </main>
  );
}


