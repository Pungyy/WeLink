export default function NewsletterFooter() {
  return (
    <footer className="bg-purple-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <form className="flex gap-2">
          <input type="email" placeholder="Email" className="p-2 rounded-md border" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">Inscription</button>
        </form>
        <div className="flex gap-4">
          <a href="#"><img src="/facebook.svg" className="h-6" /></a>
          <a href="#"><img src="/instagram.svg" className="h-6" /></a>
          <a href="#"><img src="/x-twitter.svg" className="h-6" /></a>
        </div>
      </div>
    </footer>
  )
}
