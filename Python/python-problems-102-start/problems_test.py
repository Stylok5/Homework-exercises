import unittest
import problems

class ProblemsTest(unittest.TestCase):
    
    def test_test(self):
        self.assertEqual(problems.test(), "string")

    
    def test_remove_blank(self):
        self.assertEqual(problems.remove_blank([0, False, "", [], {}, 1, 'Kevin']), [0, 1, 'Kevin'])

    def test_random_element(self):
        self.assertIn(problems.random_element(['red', 'green', 'blue']), ['red', 'green', 'blue'])

    
    def test_second_lowest_second_highest(self):
        self.assertEqual(problems.second_lowest_second_highest([99,2000,-93,40,-761115,11]), [-93,99])

    unittest.skip
    def test_coins(self):
        self.assertEqual(problems.coins(1.50), [100, 50], 'Should return the coins needed to make up the price supplied')
        self.assertEqual(problems.coins(1.99), [100, 50, 20, 20, 5, 2, 2], 'Should use the smallest number of coins possible')
        self.assertEqual(problems.coins(2.88), [100, 100, 50, 20, 10, 5, 2, 1], 'Should use the smallest number of coins possible')

    
    def test_merge_unique(self):
        self.assertEqual(problems.merge_unique([1,2,3], [4,5,6]), [1,2,3,4,5,6], 'Should merge two arrays')
        self.assertCountEqual(problems.merge_unique(['Mike', 'Emily', 'Eduardo'], ['Eduardo', 'Will', 'Emily']), ['Mike', 'Emily', 'Eduardo', 'Will'], 'Should remove duplicates')
        self.assertCountEqual(problems.merge_unique([5,10,15,20], [10,20,30,40]), [5,10,15,20,30,40], 'Should remove duplicates')

   
    def test_fibonacci(self):
        self.assertEqual(problems.fibonacci(8), [0, 1, 1, 2, 3, 5, 8, 13], "Should return the first n fibonacci numbers")
        self.assertEqual(problems.fibonacci(1), [0], "Should return the first n fibonacci numbers")
        self.assertEqual(problems.fibonacci(50), [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418,317811,514229,832040,1346269,2178309,3524578,5702887,9227465,14930352,24157817,39088169,63245986,102334155,165580141,267914296,433494437,701408733,1134903170,1836311903,2971215073,4807526976,7778742049], "Should return the first n fibonacci numbers")


if __name__ == "__main__":
    unittest.main()
