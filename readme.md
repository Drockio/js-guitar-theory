# js-guitar-theory
Pattern oriented guitar theory visualizer. Intended to be used with all types of instruments, suited mostly for stringed instruments right now. 

## Adjustments in code
- add new stringed instrument tunings in index.html
	- `.controls #tuning option[value]`
	- ex: `<option value="d,b,g,d,g,d">Guitar - Open G - DGDGBD</option>`

## TODO
- separate string specific functions from pure music functions (continue creating fretboard class)
- set up non-stringed instruments (mapping absolute coordinates)
