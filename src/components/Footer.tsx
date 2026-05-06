export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] py-12 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[8px] text-white/20 uppercase tracking-[0.4em] text-center md:text-left transition-colors hover:text-white/40">
          © 2026 faizansaleem.studio — Faizan Digital Solutions
        </div>
        
        <div className="flex gap-12 text-[8px] text-white/40 uppercase tracking-[0.2em] font-medium">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">License</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
