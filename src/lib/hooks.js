import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Fade-in elements with class .reveal as they scroll into view */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

/** Scroll to top on page change, or to #anchor if present */
export function useScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
      }, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

/** Page <title> and meta description */
export function useSeo(title, description) {
  useEffect(() => {
    if (title) document.title = title
    const m = document.querySelector('meta[name=description]')
    if (m && description) m.setAttribute('content', description)
  }, [title, description])
}
