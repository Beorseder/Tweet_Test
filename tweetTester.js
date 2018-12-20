var origTweet = "";
var modTweet1 = "";
var modTweet2 = "";
var modTweet3 = "";
var modTweet4 = "";
var convertedTweet = "";
var currWord = "";
var modWord = "";
var placeHolder = "";
var abbreviations = ["ATM", "BFF", "BFN", "BRB", "BTW", "DIY",
                                  "FTW", "FYI", "GTG", "IDC", "IDK", "IRL",
                                  "LOL", "OMG", "ROFL", "TTYL", "TY", "SRSLY",
                                  "WTF"];
var meanings = ["ATM = at the moment", "BFF = best friends forever", "BFN = bye for now", "BRB = be right back", "BTW = by the way", "DIY = do it yourself", "FTW = for the win", "FYI = for your information", "GTG = got to go", "IDC = I don't care", "IDK = I don't know", "IRL = in real life", "LOL = laughing out loud", "OMG = oh my gosh", "ROFL = rolling on floor laughing", "TTYL = talk to you later", "TY = thank you", "SRSLY = seriously", "WTF = what the frick"];
var meaningsx = ["at the moment", "best friends forever", "bye for now", "be right back", "by the way", "do it yourself", "for the win", "for your information", "got to go", "I don't care", "I don't know", "in real life", "laughing out loud", "oh my gosh", "rolling on floor laughing", "talk to you later", "thank you", "seriously", "what the frick"];
var similar = false;
var oneFound = false;
var TERMS = abbreviations.length;
var simLetters = 0;
var i = 0;
var j = 0;
var k = 0;
var l = 0;
var m = 0;
var n = 0;
var words = 0;
var numChars = 0;
var charCounter = 0;
var validGap = ['.', '?', '!', ' ', ':', ','];

origTweet = prompt("Enter tweet or abbreviation:");
numChars = origTweet.length;

while (numChars > 0) { // Counts the number of words in the tweet
    if (charCounter === 0) {
        charCounter++;
        numChars--;
    }
    
    var works = true;
    var doublePunc = false;
    for (var o = 0; o < validGap.length; o++) { //Checks to see if it's a valid character followed by a valid gap or not
        if (doublePunc) {
            break;
        }
        if (origTweet.charAt(charCounter) == validGap[o]) {
            for (var p = 0; p < validGap.length; p++) {
                if (origTweet.charAt(charCounter - 1) == validGap[p]) {
                    works = false;
                    doublePunc = true;
                    break;
                }
                else {
                    works = true;
                }
            }
        }
    }
    if (works) { //If it's a valid character followed by a valid gap, then it's a word.
        words++;
    }
    else if (!works) { //If it's the last character and wasn't a double punctuation, then it's the last word.
        if (!doublePunc && (numChars === 1)) {
            words++;
        }
    }
    charCounter++;
    numChars--;
}

if (words == 1) {
    Document.getElementById('tweetOrAbbr').innerHTML = "Original Abbreviation";
    Document.getElementById('originalText').innerHTML = origTweet;
    Document.getElementById('decoder').innerHTML = "Decoded Abbreviation";
    modTweet1 = origTweet;
    placeHolder = "NOTHING";

    for (i = 0; i < abbreviations.length; i++) { //Scans for abbreviation among the databank
        if (origTweet == abbreviations[i]) {
            placeHolder = meanings[i];
        }
    }
    if (!(placeHolder == "NOTHING")) {
        Document.getElementById('decoded').innerHTML = placeHolder;
    }
    else { //Margin of error detector and corrector
        var sameNumLetsAbrvs = [];
        var meanings2 = [];
        for (i = 0; i < abbreviations.length; i++) {
           if (abbreviations[i].length() == origTweet.length()) {
              sameNumLetsAbrvs[j] = abbreviations[i];
              meanings2[j] = meanings[i];
              j++;
           }
        }
        for (i = 0; i < sameNumLetsAbrvs.length; i++) {
            if (sameNumLetsAbrvs[i] != null) {
                modTweet2 = sameNumLetsAbrvs[i];
                modTweet3 = modTweet2;
                k = 0;
                l = 0;
                simLetters = 0;
                for (j = 0; j < modTweet1.length(); j++) {
                    m = l;
                    modTweet4 = "";
                    oneFound = false;
                    for (k = 0; k < modTweet3.length(); k++) {
                        if (!(oneFound) && (modTweet3.charAt(k) == modTweet1.charAt(l))) {
                            simLetters++;
                            l++;
                            oneFound = true;
                        }
                        else {
                            modTweet4 += modTweet3.charAt(k); //Possibly change back to Character.toString(modTweet3.charAt(k))
                        }
                    }
                    modTweet3 = modTweet4;
                    if (l == m) {
                        l++;
                    }
                }
                if ((simLetters == origTweet.length() - 1) || (simLetters == origTweet.length())) {
                    similar = true;
                    break;
                }
            }
        }

        if (similar) {
            Document.getElementById('decoded').innerHTML = ("Did you mean " + sameNumLetsAbrvs[i] + "? " + meanings2[i]);
        }
        else {
            Document.getElementById('decoder').innerHTML = "Error";
            Document.getElementById('decoded').innerHTML = "Sorry, don't know that one.";
        }
    }
}
else {
    if (origTweet.length() > 280) {
        Document.getElementById('tweetOrAbbr').innerHTML = "Tweet too long.";
    }
 else {
     Document.getElementById('tweetOrAbbr').innerHTML = "Original Tweet";
     Document.getElementById('originalText').innerHTMl = origTweet;
     inss = new Scanner(origTweet); 
     
     //THIS IS WHAT I'M STUCK ON RIGHT NOW. GOING TO HAVE TO DEVELOP A WAY TO DETERMINE IF SOMETHING IS A WORD, THEN COMPARE IT TO THE LIST OF ABBREVIATIONS

     while (inss.hasNext()) {
        currWord = inss.next();
        if ((currWord.charAt(currWord.length() - 1) == '.') || (currWord.charAt(currWord.length() - 1) == '!') || (currWord.charAt(currWord.length() -   1) == '?') || (currWord.charAt(currWord.length() - 1) == ',') || (currWord.charAt(currWord.length() - 1) == ';') ||     (currWord.charAt(currWord.length() - 1) == '/')) {
            modWord = currWord.substring(0, currWord.length() - 1);
        }
        else {
            modWord = currWord;
        }
        placeHolder = "NOTHING";

        for (i = 0; i < abbreviations.length; i++) {
            if (modWord.equals(abbreviations[i])) {
                placeHolder = meanings[i];
            }
        }
        if (!(placeHolder.equals("NOTHING"))) {
            System.out.println(placeHolder);
        }
     }

     System.out.println("");
     System.out.println("Converted tweet: ");
     inss = new Scanner(origTweet);
     modTweet1 = "";
     
     while (inss.hasNext()) {
        currWord = inss.next();

         if ((currWord.charAt(currWord.length() - 1) == '.') || (currWord.charAt(currWord.length() - 1) == '!') || (currWord.charAt(currWord.length() - 1) == '?') || (currWord.charAt(currWord.length() - 1) == ',') || (currWord.charAt(currWord.length() - 1) == ';') || (currWord.charAt(currWord.length() - 1) == '/')) {
            modWord = currWord.substring(0, currWord.length() - 1);
        }
        else {
            modWord = currWord;
        }
        placeHolder = "NOTHING";

        for (i = 0; i < abbreviations.length; i++) {
            if (modWord.equals(abbreviations[i])) {
                placeHolder = meaningsx[i] + " ";
            }
        }
        if (!(placeHolder.equals("NOTHING"))) {
            modTweet1 += placeHolder;
        }
        else {
            modTweet1 += currWord + " ";
        }
     }
     modTweet1 = modTweet1.substring(0, modTweet1.length() - 1);
     System.out.println(modTweet1);
 }  
}