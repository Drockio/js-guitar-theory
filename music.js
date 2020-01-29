//add numbers on side
//add dots on fretboard
//make drop downs dynamic


function Music(strings, targetElement) {
    this.strings = strings.split(',');
    this.targetElement = targetElement;
    this.targetElementSelector = '#' + targetElement;
    this.populateStrings();
}

//object literal class implementation
Music.prototype = {
    numFrets : 20,
    notes: ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'],

    removeHighlighting: function () {
        $(this.targetElementSelector + ' ol li span.highlight').removeClass('highlight');
    },

    updateFretboard: function () {
        fretBoard.clearFretboard();
        var scale = $('select#scale option:selected').val();
        var key = $('select#key option:selected').val();

        //setup strings 
        this.strings = ($('select#tuning option:selected').val()).split(',');
        this.populateStrings();
        switch (scale) {
            case 'major-scale':
                musicScales.showMajorScale(key);
                break;
            case 'pentatonic-scale':
                musicScales.showPentatonicScale(key);
                break;
            case 'major-chord-notes':
                musicScales.showMajorChordNotes(key);
                break;
        }
    },

    getNoteViaInterval : function(note, interval) {
        var index = this.notes.indexOf(note);

        var targetNote;
        //interval goes off the deep end
        if ((interval + index) >= this.notes.length) {
            var initialNotes = this.notes.length - index;
            targetNote = this.notes[interval - initialNotes];
        }
        //interval is within array
        else {
            targetNote = this.notes[index + interval];
        }
        return targetNote;
    },

    getTimbres : function(initialFrequency){
        let intervalBetweenQuarterNotes = .97;

        let message = `Note: frequency between notes set to ${intervalBetweenQuarterNotes}.
        \nhttps://pages.mtu.edu/~suits/notefreqs.html is where I got the intervals close. 
        \nSomething seems a little off further up in frequencies, off by about 2-100hz at higher ranges.
        \nSpreadsheet: https://docs.google.com/spreadsheets/d/1ZncHu7g4u71ULjpidS8RrhZZ3jK3FoPuR3gDfUjPCcI/edit#gid=0`;
        console.log(message);

        Music.prototype.getTimbre('    C', initialFrequency);
        Music.prototype.getTimbre('C#/Db', initialFrequency + intervalBetweenQuarterNotes++);
        Music.prototype.getTimbre('    D', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('D#/Eb', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('    E', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('    F', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('F#/Gb', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('    G', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('G#/Ab', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('    A', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('A#/Bb', initialFrequency + intervalBetweenQuarterNotes++ );
        Music.prototype.getTimbre('    B', initialFrequency + intervalBetweenQuarterNotes++ );
        //B Sharp yo!
    },

    getTimbre : function(note, initialFrequency){
        let secondFrequency = initialFrequency * 2;
        let thirdFrequency = secondFrequency * 2;
        let fourthFrequency = thirdFrequency * 2;
        let fifthFrequency = fourthFrequency * 2;
        let sixthFrequency = fifthFrequency * 2;
        let seventhFrequency = sixthFrequency * 2;
        let eighthFrequency = seventhFrequency * 2;
        let ninthFrequency = eighthFrequency * 2;
        let verboseOutput = `Note:${note} :: ${note}0: ${initialFrequency} | ${note}1: ${secondFrequency} | ${note}2: ${thirdFrequency} | ${note}3: ${fourthFrequency} | ${note}4: ${fifthFrequency} | ${note}5: ${sixthFrequency} | ${note}6: ${seventhFrequency} | ${note}7: ${eighthFrequency} | ${note}8: ${ninthFrequency}`;
        let tabularOutput = `${note}\n${note}0: ${initialFrequency}\n${note}1: ${secondFrequency}\n${note}2: ${thirdFrequency}\n${note}3: ${fourthFrequency}\n${note}4: ${fifthFrequency}\n${note}5: ${sixthFrequency}\n${note}6: ${seventhFrequency}\n${note}7: ${eighthFrequency}\n${note}8: ${ninthFrequency}`;

        console.log(tabularOutput);
    },

    populateString : function(stringName, note, extraClassString) {
        $(stringName).append('<li class="nut ' + extraClassString + '"><span class="' + note.replace('#', '-sharp')  + '">' + note + '</span></li>');
        for (var i = 1; i < this.numFrets; i++) {
            note = this.getNoteViaInterval(note, 1);
            $(stringName).append('<li class="' + extraClassString + '"><span class="' + note.replace('#', '-sharp') + '">' + note + '</span></li>');
        }
    },

    populateStrings: function () {
        //create ol for each string
        for (var i = this.strings.length; i > 0; i--) {
            $(this.targetElementSelector).append('<ol class="string-' + i + '"></ol>')
        }

        //find go through strings and add notes.  add classes for edge strings for display reasons
        for (var i = 1; i < this.strings.length + 1; i++) {
            var elementSelector = this.targetElementSelector + ' ol.string-' + i;
            if (i == 1)
                this.populateString(elementSelector, this.strings[i - 1], 'highest-string');
            else if (i == this.strings.length)
                this.populateString(elementSelector, this.strings[i - 1], 'lowest-string');
            else
                this.populateString(elementSelector, this.strings[i - 1], '');
        }
    }
}

const musicScales = {
    addClassToNote : function(note, cssClass) {
        var target = '.' + note.replace('#', '-sharp');
        $(fretBoard1.targetElementSelector + ' ol li span' + target).addClass(cssClass);
    },

    removeHighlighting: function () {
        $(fretBoard1.targetElementSelector + ' ol li span.highlight').removeClass('highlight');
    },

    getNoteViaInterval : function(note, interval) {
        var index = Music.prototype.notes.indexOf(note);

        var targetNote;
        //interval goes off the deep end
        if ((interval + index) >= Music.prototype.notes.length) {
            var initialNotes = Music.prototype.notes.length - index;
            targetNote = Music.prototype.notes[interval - initialNotes];
        }
        //interval is within array
        else {
            targetNote = Music.prototype.notes[index + interval];
        }
        return targetNote;
    },

    showMajorScale : function(root) {
        //WWHWWWH
        musicScales.removeHighlighting();                                 //degree of scale
        root = root.replace('-sharp', '#');                               //===============
        musicScales.addClassToNote(root, 'root');                                       //1
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 2), 'inScale'); //2
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 4), 'inScale'); //3
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 5), 'inScale'); //4
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 7), 'inScale'); //5
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 9), 'inScale'); //6
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 11), 'inScale');//7
    },

    showMajorChordNotes : function(root) {
        //1 3 5
        musicScales.removeHighlighting();                                 //degree of scale
        root = root.replace('-sharp', '#');                               //===============
        musicScales.addClassToNote(root, 'root');                                       //1
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 4), 'inScale'); //2
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 7), 'inScale'); //3
    },

    showPentatonicScale : function(root) {
        //drop 4th and 7th
        musicScales.removeHighlighting();                                 //degree of scale
        root = root.replace('-sharp', '#');                               //===============
        musicScales.addClassToNote(root, 'root');                                       //1
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 2), 'inScale'); //2
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 4), 'inScale'); //3
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 7), 'inScale'); //5
        musicScales.addClassToNote(musicScales.getNoteViaInterval(root, 9), 'inScale'); //6
    }

}

let fretBoard = {
    clearFretboard : function() {
        $(fretBoard1.targetElementSelector + ' ol').remove();
    }
}
