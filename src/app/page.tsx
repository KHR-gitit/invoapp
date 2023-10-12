import Link from "next/link";
import { Suspense } from "react";

import { type RouterOutputs, api } from "trpc-api";
import { ServerForm } from "./server-form";

import { AuthShowcase } from "./auth-showcase";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-16">
      <div className="container flex flex-col items-center gap-12 px-4 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-purple-400">invo</span> App
        </h1>
        <div className="bg-gray-50 px-5 py-10 rounded-lg">
          <h3 className="text-3xl opacity-100">Making Invoice Made Easy</h3>
        </div>
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          {/** @ts-expect-error - Async Server Component */}
          <AuthShowcase />

          <div className="flex h-max items-start justify-start gap-2">
            <ServerForm />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            {/** @ts-expect-error - Async Server Component */}
            <PostList promise={api.post.getAll.query()} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function PostList(props: {
  promise: Promise<RouterOutputs["post"]["getAll"]>;
}) {
  const posts = await props.promise;

  return (
    <div className="flex flex-col items-center gap-2">
      {posts.items.map((post) => (
        <p key={post.id} className="text-lg">
          {post.text} - {post.createdBy.name}
        </p>
      ))}
    </div>
  );
}
