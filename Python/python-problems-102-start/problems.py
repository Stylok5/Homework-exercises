import random
# to pass the test function, please return a string of 'string' from then function
# eg: test() => 'string'
def test():
    return "string"

# write a function to remove all empty values (False, [], {}, (), "", None) EXCEPT 0 from an array.
# It should handle complex data types eg: {}, [] etc.
# eg: [0, False, "", [], {}, 1, 'Kevin'] => [0, 1, 'Kevin'];
def remove_blank(my_list):
    return [item for item in my_list if item or item is 0]

    # result = []
    # for item in my_list:
    #     if item or 0:
    #         result.append(item)
    #  filtered = list(filter(lambda x: x  in [None,False, "", [], {},()], my_list))
    #  return filtered
   

import random
# write a function to return a random element from an list
# eg: [1,"elephant", "apple", 67] => "elephant"
def random_element(my_list):
     return random.choice(my_list)
   

# write a function that returns the second lowest and second highest number in an list
# eg: [1,2,3,4,5,6,7,8] => [2,7]
def second_lowest_second_highest(my_list):
  my_list.sort()
  return [my_list[1],my_list[-2]]

# write a function that will convert a price into coins needed to make up that price
# the coins available are 1, 2, 5, 10, 20, 50, 100
# the function should use the smallest number of coins possible
# eg: coins(1.99) => [100, 50, 20, 20, 5, 2, 2]
def coins(price):
    pricing = price * 100
    coinsList = [100, 50, 20, 20, 10, 5, 2, 1]
    listCreate = []
    for coin in coinsList:
        while coin <= pricing:
            pricing -= coin
            listCreate.append(coin)
    return listCreate



# write a function to merge two lists and remove duplicates
# eg: mergeUnique([9,8,8,9], [7,8,8,7]) => [9,8,7]
def merge_unique(list1, list2):
#  merged_list = list(set(list1 + list2))
   list1.extend(item for item in list2 if item not in list1)
   return list1
   
# write a function to find the first n fibonacci numbers
# the fibonacci sequence is a series of numbers, each number is the sum of the last two
# 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 etc...
# eg: fibonacci(4) => [0,1,1,2]; fibonacci(8) => [0, 1, 1, 2, 3, 5, 8, 13];
import functools
def fibonacci(n):
    if n <= 0:
        return []
    if n == 1:
        return [0]
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib