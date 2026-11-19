const c=n=>`rgb(var(--${n}) / <alpha-value>)`
export default {darkMode:'class',content:['./index.html','./src/**/*.{js,jsx}'],
theme:{extend:{colors:{bg:c('bg'),card:c('card'),ink:c('ink'),mute:c('mute'),accent:c('accent'),moss:c('moss'),line:c('line')},
fontFamily:{display:['Fraunces','serif'],sans:['Manrope','sans-serif']}}}}
