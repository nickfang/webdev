import os
import sys
import pandas
import math

numTotalLetters = 200

def processCSV(df):
	letters = dict()
	for words in df.values:
		for word in words:
			for char in str(word):
				if char != "\'":
					if letters.get(char.lower()) == None:
						letters[char.lower()] = 1
					else:
						letters[char.lower()] += 1
	total = 0
	results = dict()
	for x in letters:
		total +=letters[x]
	numLetters = 0
	for x in letters:
		num = letters[x] / total * numTotalLetters
		# make sure we have atleast one of each letter
		if num < 1:
			num = math.ceil(num)
		# favor vowels
		elif x in ["a", "e", "i", "o", "u"]:
			num = math.ceil(num)
		# round down everything else
		else:
			num = math.floor(num)
		results[x] = num
		numLetters += num

	sys.stdout.write("{")
	for key in sorted(results):
		sys.stdout.write(key + ":" + str(results[key]) + ", ")
	sys.stdout.write("}\n")
	sys.stdout.flush()
	print(numLetters)


df=pandas.read_csv("simpleWords.csv",header=None)
processCSV(df)
#numTotalLetters = 100
# {a:6, b:1, c:2, d:4, e:13, f:1, g:5, h:3, i:9, j:1, k:1, l:4, m:1, n:7, o:6, p:2, q:1, r:7, s:10, t:6, u:3, v:1, w:1, x:1, y:1, z:1}
# 98
#numtotalLetters = 200
# {a:12, b:3, c:5, d:9, e:26, f:3, g:10, h:6, i:17, j:1, k:2, l:8, m:3, n:15, o:12, p:5, q:1, r:15, s:20, t:12, u:5, v:1, w:3, x:1, y:2, z:1, }
# 198

df=pandas.read_csv("words.csv",header=None)
processCSV(df)
# {a:8, b:1, c:4, d:4, e:12, f:1, g:3, h:2, i:9, j:1, k:1, l:5, m:2, n:7, o:7, p:3, q:1, r:7, s:7, t:6, u:4, v:1, w:1, x:1, y:1, z:1}
# 100
# {a:16, b:3, c:8, d:8, e:24, f:2, g:6, h:4, i:17, j:1, k:2, l:10, m:5, n:14, o:13, p:6, q:1, r:14, s:15, t:13, u:7, v:2, w:1, x:1, y:3, z:1, }
# 197
