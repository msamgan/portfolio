import Link from "next/link"

import PostList from "../../components/PostList"
import { titleGenerator } from "@/methods"
import { baseUrl } from "@/constants"
import PageHeader from "@/app/components/PageHeader"

const description =
    "Explore msamgan's technical blog featuring insightful programming posts, in-depth code tutorials, and the latest updates in the tech world. based on a tag"
const tags = "msamgan, blog, technical blog, programming, code, posts"

export async function generateMetadata({ params }) {
    const slug = params.slug
    return {
        title: titleGenerator(`Posts with tag: ${slug}`),
        description: description,
        keywords: tags,
        openGraph: {
            type: "article",
            title: titleGenerator(`Posts with tag: ${slug}`),
            url: "https://msamgan.com/posts",
            description: description,
            images: "https://msamgan.dev/storage/images/MNn9limQxw66kpBfxjnXQ4jvdndLXom3bh7oeMvc.png"
        }
    }
}

async function getPostList({ slug, query }) {
    const res = await fetch(baseUrl + "post/tag/" + slug + "?query=" + query)
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return res.json()
}

export default async function Posts(request) {
    const slug = request.params.slug
    const query = request.searchParams.query || ""

    const postList = await getPostList({ slug, query })

    return (
        <div className="">
            <PageHeader title={`Posts with tag: ${slug}`} />
            <div className="flex">
                <span className="inline-block px-4 py-2 mb-2 mr-2 text-sm font-light text-gray-600 bg-gray-100 rounded-full">
                    <Link href={"/posts"} className={"hover:text-red-600"}>
                        All Posts
                    </Link>
                </span>
            </div>
            <PostList postList={postList} query={query} />
        </div>
    )
}
