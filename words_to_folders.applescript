set sourceFolder to choose folder with prompt "Source Folder?"

tell application "Finder"
	set suffix to ""
	-- set lyricList to {"Why", "are", "there", "so", "many", "Songs", "about", "rainbows", "And", "what's", "on", "the", "other", "side?", "Rainbow's", "are", "visions", "But", "only", "illusions", "And", "rainbows", "have", "nothing", "to", "hide", "So", "we've", "been", "told", "and", "some", "chose", "to", "believe", "it", "I", "know", "they're", "wrong,", "wait", "and", "see", "Someday", "we'll", "find", "it", "The", "Rainbow", "Connection", "The", "lovers,", "the", "dreamers", "and", "me", "Who", "said", "that", "every", "wish", "Would", "be", "heard", "and", "answered", "When", "wished", "on", "the", "morning", "star", "Somebody", "thought", "of", "that", "And", "someone", "believed", "it", "Look", "what", "it's", "done", "so", "far", "What's", "so", "amazing", "That", "keeps", "us", "star", "gazing", "And", "what", "do", "we", "think", "we", "might", "see", "Someday", "we'll", "find", "it", "The", "Rainbow", "Connection", "The", "lovers", "the", "dreamers", "and", "me", "All", "of", "us", "under", "its", "spell", "We", "know", "that", "it's", "probably", "magic", "Have", "you", "been", "half", "asleep", "And", "have", "you", "heard", "voices", "I've", "heard", "them", "calling", "my", "name", "Is", "this", "the", "sweet", "sound", "that", "calls", "the", "young", "sailors", "The", "voice", "might", "be", "one", "and", "the", "same", "I've", "heard", "it", "too", "many", "times", "to", "ignore", "it", "It's", "something", "that", "I'm", "supposed", "to", "be", "Someday", "we'll", "find", "it", "The", "Rainbow", "Connection", "The", "lovers,", "the", "dreamers", "and", "me", "Whaa", "da", "da", "di", "da", "da", "doo", "ba", "da", "da", "da", "da", "di", "da", "doo"}
	
	set lyricList to {"Somewhere", "over", "the", "rainbow", "Way", "up", "high", "There's", "a", "land", "that", "I", "heard", "of", "Once", "in", "a", "lullaby", "Somewhere", "over", "the", "rainbow", "Skies", "are", "blue", "And", "the", "dreams", "that", "you", "dare", "to", "dream", "Really", "do", "come", "true", "Someday", "I'll", "wish", "upon", "a", "star", "And", "wake", "up", "where", "the", "clouds", "are", "far", "Behind", "me", "Where", "troubles", "melt", "like", "lemon", "drops", "Away", "above", "the", "chimney", "tops", "That's", "where", "you'll", "find", "me", "Somewhere", "over", "the", "rainbow", "Bluebirds", "fly", "Birds", "fly", "over", "the", "rainbow", "Why", "then", "oh", "why", "can't", "I", "If", "happy", "little", "bluebirds", "fly", "Beyond", "the", "rainbow", "Why", "oh", "why", "can't", "I"}
	
	repeat with aWord in the reverse of lyricList
		try
			make new folder at sourceFolder with properties {name:aWord}
		on error
			set suffix to suffix & " "
			make new folder at sourceFolder with properties {name:aWord & suffix}
		end try
		delay 2
	end repeat
end tell