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