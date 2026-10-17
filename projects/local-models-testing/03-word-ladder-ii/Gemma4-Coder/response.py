Given beginWord, endWord, and wordList, find ALL shortest transformation sequences from beginWord to endWord, changing one letter per step.
Example: beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Write a Python function find_ladders(beginWord, endWord, wordList) -> list[list[str]].
Use BFS to build distance map + DFS backtracking to enumerate all shorte ... (truncated)

```python
def find_ladders(beginWord, endWord, wordList):
    if beginWord == endWord:
        return [[beginWord]]

    word_set = set(wordList)
    if endWord not in word_set:
        return []

    distance = {beginWord: 0}
    queue = [beginWord]
    while queue:
        word = queue.pop(0)
        for i in range(len(word)):
            new_word = word[:i] + chr(ord(word[i]) - 1) + word[i+1:]
            if new_word in word_set and new_word not in distance:
                distance[new_word] = distance[word] + 1
                queue.append(new_word)
            elif new_word in distance and distance[new_word] == distance[word] + 1:
                pass

    def backtrack(word):
        if word == beginWord:
            return [[word]]
        neighbors = []
        for i in range(len(word)):
            new_word = word[:i] + chr(ord(word[i]) - 1) + word[i+1:]
            if new_word in distance and distance[new_word] == distance[word] - 1:
                neighbors.append(new_word)
        return [path for path in [path + [word] for path in backtrack(neighbor) for neighbor in neighbors] if len(path) == len(distance[beginWord]) + 1]

    return [path[::-1] for path in backtrack(endWord)]
```


Exiting...