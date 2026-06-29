def split_array(nums, k):
    low = max(nums)
    high = sum(nums)

    while low < high:
        mid = (low + high) // 2
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