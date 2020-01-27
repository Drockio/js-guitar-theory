# js-guitar-theory
Pattern oriented guitar theory visualizer. Intended to be used with all types of instruments, suited mostly for stringed instruments right now. 

## Adjustments in code
- add new stringed instrument tunings
	- file: index.html
		- location: `.controls #tuning option[value]`
			- ex: `<option value="d,b,g,d,g,d">Guitar - Open G - DGDGBD</option>`
- add new scale dimensions (try some weird ones!)
	- file: music.js
		- musicScales.showMajorScale()
		- musicScales.showMajorChordNotes()
		- musicScales.showPentatonicScale()

## TODO
- separate string specific functions from pure music functions (continue creating fretboard class)
- set up non-stringed instruments
	- Clarinet
		- Use picture background for instrument
		- Use absolute mapping coordinates
