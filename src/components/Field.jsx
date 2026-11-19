

const Field=({label,err,...p})=><label className="block text-xs text-mute">{label}<input {...p} className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm text-ink outline-none transition focus:ring-2 focus:ring-accent/30 ${err?'border-red-500':'border-line focus:border-accent'}`}/></label>
export default Field
