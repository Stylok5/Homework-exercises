#  to pass the test function, please return a string of 'string' from then function
# eg: test() => 'string'
def test():
    return 'string'

# write a function that returns "Hello World!" if no argument is given, or "Hello <argument>!" otherwise
# eg: hello() => "Hello World!"; hello("Mike") => "Hello Mike!"
# top tip - use a default value for the argument in the function in case an argument is not provided when the
# function is called. Google python default arguments in functions


def hello(string="World"):
    return f"Hello {string}!"

import math
# write a function that will calculate the area of a circle, given the radius
def area_of_circle(radius):
    area = math.pi * math.pow(radius, 2)

    return area


# write a function to convert celcius to farenheit
def celcius_to_farenheit(celcius):
    F = (celcius * 1.8) + 32
    return F


# write a function that will reverse a number (eg. 456733 become 337654)
def number_reverse(number):
    # reversing =  (str(number)).reverse()
    reverseNum = float("".join(reversed(str(number))))
    
    return reverseNum

# write a function to check if a word or phrase is a palindrome returning a boolean
# eg. palindrome_check('dad') => True, palindrome('nonsense') => False


def palindrome_check(string):
    reverseStr = ("".join(reversed(string)))
    if string.replace(" ","") == reverseStr.replace(" ",""):
        return True
    else :
        return False


# write a function that returns the letters of a word or phrase in alphabetical order case insensitive
# eg. order_string_alphabetically('javascript is cool') => 'aacciijlooprsstv'
def order_string_alphabetically(string):
  return "".join(sorted(string.lower().replace(" ", "")))

# write a function that capitalizes the first letter of each word
# eg. title_case('the lord of the rings') => 'The Lord Of The Rings'


def title_case(string):
  return string.title()

# write a function that returns the number of vowels in a string case insensitive
# 'y' should not be considered a vowel
# eg: num_of_vowels('Yellow Submarine') => 6


def num_of_vowels(string):
    vowelCount = 0
    vowels = ["a", "e", "i", "o", "u"]
    for letters in string:
        if letters in vowels:
            vowelCount += 1
    return vowelCount
      
    
          
# write a function that frames a string in asterisks (*)
#                             ***************
# eg: frame('Hello Kitty') => * Hello Kitty *
#                             ***************


def frame(string):
  replaced = ""
  for letter in string:
     replaced += "*"
  return f"****{replaced}\n* {string} *\n****{replaced}"
   
