export default function HeroCinematic() {
return (
<section className="relative overflow-hidden rounded-2xl bg-black text-white">
<div className="aspect-[16/7] w-full">
<video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-90">
<source src="/mock/hero.mp4" type="video/mp4" />
</video>
</div>
<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
<div className="absolute inset-x-0 bottom-6 mx-auto max-w-6xl px-4">
<h1 className="text-3xl md:text-5xl font-semibold">Cada par cuenta una historia.</h1>
<p className="mt-2 max-w-xl text-base md:text-lg text-neutral-200">Arte en sneakers, hechos a mano en Argentina.</p>
<div className="mt-4 flex gap-3">
<a href="#custom" className="rounded-xl bg-white px-4 py-2 text-black">Encargar un custom</a>
<a href="#destacados" className="rounded-xl border border-white/50 px-4 py-2">Ver tienda</a>
</div>
</div>
</section>
);
}