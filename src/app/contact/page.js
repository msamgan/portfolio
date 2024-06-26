import data from "../../data.json"
import { titleGenerator } from "@/methods"

const description =
    "Get in touch with me for any queries, feedback or just to say hi. I am always open to new opportunities and collaborations."
const tags = "contact, email, address, phone, get in touch, feedback, queries, collaborations, opportunities"

export const metadata = {
    title: titleGenerator("Contact"),
    description: description,
    tags: tags,
    openGraph: {
        title: titleGenerator("Contact"),
        description: description,
        type: "website",
        images: "https://msamgan.dev/storage/images/MNn9limQxw66kpBfxjnXQ4jvdndLXom3bh7oeMvc.png",
        url: "https://msamgan.com/contact"
    }
}

export default function Contact() {
    return (
        <>
            <section className="text-gray-900 bg-gray-100">
                <div className="max-w-6xl px-6 mx-auto grid grid-cols-1 lg:px-8 md:grid-cols-2 md:divide-x">
                    <div className="py-6 mt-4 md:py-0 md:px-6">
                        <h1 className="text-3xl font-bold">Get in touch</h1>
                        <div className="pt-4 pb-4 space-y-4">
                            <p className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-2 sm:mr-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="font-light">{data.contact.address}</span>
                            </p>
                            {/* <p className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-2 sm:mr-6"
                                >
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span>{data.contact.phone}</span>
                            </p> */}
                            <p className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-2 sm:mr-6"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span className="font-light">{data.contact.email}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
