const BASE_URL = import.meta.env.VITE_BASE_URL

const NewsletterService = {
    addEmail: async (email: string) => {
        try {
            const res = await fetch(`${BASE_URL}/newsletterMembers`, {
                method: 'POST',
                body: JSON.stringify({ email: email })
            })

            if (!res.ok) throw new Error(res.statusText)

            return true
        } catch (error) {
            if (error instanceof Error) return error.message
        }
    }
}

export default NewsletterService