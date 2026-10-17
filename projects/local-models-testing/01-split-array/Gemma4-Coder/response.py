Given an array nums of non-negative integers and an integer k, split the array into k CONTIGUOUS subarrays. Minimize the largest sum among these k subarrays.
Example: nums = [7,2,5,10,8], k = 2 -> Output: 18 (Optimal splits: [7,2,5]=14 and [10,8]=18)
Write a Python function split_array(nums, k) that returns the minimized largest sum.
Use O(n log(sum)) binary search + greedy approach.
Output ONLY the Python code. No explanations.

```python
def split_array(nums, k):
    left, right = max(nums), sum(nums)
    while left < right:
        mid = (left + right) // 2
        count = 1
        current_sum = 0
        for num in nums:
            if current_sum + num > mid:
                count += 1
                current_sum = num
            else:
                current_sum += num
        if count <= k:
            right = mid
        else:
            left = mid + 1
    return left
```


Exiting...