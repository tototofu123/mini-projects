Given beginWord, endWord, and wordList, find ALL shortest transformation sequences from beginWord to endWord, changing one letter per step.
Example: beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Write a Python function find_ladders(beginWord, endWord, wordList) -> list[list[str]].
Use BFS to build distance map + DFS backtracking to enumerate all shorte ... (truncated)

```python
def find_ladds(beginWord, endWord, wordList):
    if endWord not in wordList:
        return []

    word_set = set(wordList)
    word_set.add(beginWord)
    adj = {}
    for word in word_set:
        for i in range(len(word)):
            for ch in "abcdefghijklmnopqrstuvwxyz":
                new_word = word[:i] + ch + word[i+1:]
                if new_word in word_set:
                    adj.setdefault(word, set()).add(new_word)

    dist = {word: -1 for word in word_set}
    dist[beginWord] = 0
    queue = collections.deque([beginWord])
    while queue:
        word = queue.popleft()
        for neighbor in adj[word]:
            if dist[neighbor] == -1:
                dist[neighbor] = dist[word] + 1
                queue.append(neighbor)

    if dist[endWord] == -1:
        return []

    res = []
    def dfs(word, path):
        if word == endWord:
            res.append(path)
            return
        for neighbor in adj[word]:
            if dist[neighbor] == dist[word] + 1:
                dfs(neighbor, path + [neighbor])

    dfs(beginWord, [beginWord])
    return res
```