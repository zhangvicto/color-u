import os
import json
import sys
import random

#Global Variables: --------------------------------------------------------------------------------------------
#Monk 10: Bokara Gray
monk10 = ["#ffffff", "#fcdfe0", "#42026f", "#0528d7", "#126503", "#000000", "#031a4a", "#515151"]

#Monk 9: Sambuca
monk9 = ["#ffffff", "#d89e78", "#000000", "#7d7d7d", "#fefecc", "#866d34", "#8b8ed3", "#b05617"]

#Monk 8: Very Dark Brown
monk8 = ["#ffffff", "#dda0dd", "#ffa500", "#ffc0cb", "#ffff00", "#e0115f",  "#a8fddf", "#f8fbaf"]

#Monk 7: Potters Clay
monk7 = ["#000000", "#d6c885", "#fefccb", "#00b8e3", "#dc8d14", "#faa9f9", "#6535c4", "#009f00"]

#Monk 6: Muesli
monk6 = ["#0535fe", "#e8c7C8", "#990000", "#367588", "#472C4C", "#ffffff", "#40e0d0", "#722f37"]

#Monk 5: Pancho
monk5 = ["#fffc61", "#bdf2fc", "#f4336f", "#fc2601", "#582c08", "#b46303", "#698e40", "#7d0101"]

#Monk 4: Double Pearl Lusta
monk4 = ["#64fa2e", "#ac9b87", "#ffffff", "#f9fcaf", "#955a6c", "#f47278", "#77d7e8", "#93f895"]

#Monk 3: Gin Fizz
monk3 = ["#ba9f80", "#e3ba8e", "#ff9966", "#00aaae", "#2fa5db", "#67c9eb", "#35c25c", "#d91c01"]

#Monk 2: Fantasy 
monk2 = ["#bdf2fc", "#fd2501", "#fffc62", "#c8fc80", "#955a6c", "#303361", "#000000", "#93f895"]

#Monk 1: Linen
monk1 = ["#d7f6fa", "#fcdfe0", "#f9e7fe", "#fefce5", "#d9d9d9", "#efefef", "#e9dfcf", "#eld2c0"]

#Dictionary of all skintones and their hexcode: 
skinTones = {"#f6ede4": monk1, "#f3e7bd": monk2, "#f7ead0": monk3, "#eadaba": monk4, "#d7bd96": monk5, "#a07e56": monk6, "#825c43": monk7, "#604134": monk8, "#3a312a": monk9, "#292420": monk10}

#Helper Function: --------------------------------------------------------------------------------------------
#The input of the function should be a string ("#000000") of an hexcode indicating a skinTone colour. 
def SelectRandomColour(skinTone_HexCode):
    #Selects which array to choose from depending on the value, chooses monk1 by default just in case. 
    selectedSkinTone = skinTones.get(skinTone_HexCode, monk1)

    #Chooses a random colour from that skintone array and returns it. 
    skinToneIndex = random.randint(0, len(selectedSkinTone))
    colorForSkinTone = selectedSkinTone[skinToneIndex]
    return colorForSkinTone
