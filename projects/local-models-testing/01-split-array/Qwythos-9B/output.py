def split_array(nums, k):
    """
    Split the array into k contiguous subarrays such that the maximum sum
    among those subarrays is minimized. Uses binary search on the answer
    combined with a greedy feasibility check.

    Time complexity: O(n log(sum(nums)))
    Space complexity: O(1)
    """
    low = max(nums)
    high = sum(nums)

    while low < high:
        mid = (low + high) // 2
        # Greedy check: can we partition into <= k subarrays with max sum <= mid?
        count = 1
        current_sum = 0
        for num in nums:
            if current_sum + num > mid:
                count += 1
                current_sum = num
            else:
                current_sum += num
        if count <= k:
            high = mid
        else:
            low = mid + 1

    return low