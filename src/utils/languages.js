// Judge0 CE language IDs + Monaco language names + starter code
export const LANGUAGES = [
    {
        id: 'python',
        label: 'Python',
        judge0Id: 71,
        monacoLang: 'python',
        extension: '.py',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        color: '#3b82f6',
        defaultCode: `# Python 3
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))

numbers = [1, 2, 3, 4, 5]
print(f"Sum: {sum(numbers)}")
print(f"Squares: {[x**2 for x in numbers]}")
`,
    },
    {
        id: 'javascript',
        label: 'JavaScript (Node.js)',
        judge0Id: 63,
        monacoLang: 'javascript',
        extension: '.js',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        color: '#f59e0b',
        defaultCode: `// JavaScript (Node.js)
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));

const numbers = [1, 2, 3, 4, 5];
console.log("Sum:", numbers.reduce((a, b) => a + b, 0));
console.log("Squares:", numbers.map(n => n ** 2));
`,
    },
    {
        id: 'html',
        label: 'HTML / JS / CSS',
        judge0Id: null, // HTML runs locally in browser
        monacoLang: 'html',
        extension: '.html',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        color: '#e34f26',
        defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
</head>
<body>
    <h1>Hello, CodeAura!</h1>
    <p>Edit this HTML file to see changes.</p>
</body>
</html>
`,
    },
    {
        id: 'css',
        label: 'CSS',
        judge0Id: null,
        monacoLang: 'css',
        extension: '.css',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        color: '#1572b6',
        defaultCode: `/* CSS Styles */
body {
    font-family: sans-serif;
    background-color: #f0f0f0;
    color: #333;
    padding: 2rem;
}
h1 {
    color: #e34f26;
}
`,
        hidden: true, // Hide from the main language selector dropdown
    },
    {
        id: 'js-web',
        label: 'JavaScript (Web)',
        judge0Id: null,
        monacoLang: 'javascript',
        extension: '.js',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        color: '#f59e0b',
        defaultCode: `// JavaScript (Browser)
console.log("Hello from JavaScript!");
// document.querySelector('h1').style.color = 'blue';
`,
        hidden: true,
    },
    {
        id: 'typescript',
        label: 'TypeScript',
        judge0Id: 74,
        monacoLang: 'typescript',
        extension: '.ts',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        color: '#3b82f6',
        defaultCode: `// TypeScript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));

const numbers: number[] = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log("Sum:", sum);
`,
    },
    {
        id: 'cpp',
        label: 'C++',
        judge0Id: 54,
        monacoLang: 'cpp',
        extension: '.cpp',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        color: '#8b5cf6',
        defaultCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;

    vector<int> nums = {1, 2, 3, 4, 5};
    int sum = accumulate(nums.begin(), nums.end(), 0);
    cout << "Sum: " << sum << endl;

    return 0;
}
`,
    },
    {
        id: 'c',
        label: 'C',
        judge0Id: 50,
        monacoLang: 'c',
        extension: '.c',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
        color: '#06b6d4',
        defaultCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");

    int nums[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) sum += nums[i];
    printf("Sum: %d\\n", sum);

    return 0;
}
`,
    },
    {
        id: 'java',
        label: 'Java',
        judge0Id: 62,
        monacoLang: 'java',
        extension: '.java',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        color: '#ef4444',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        int[] nums = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int n : nums) sum += n;
        System.out.println("Sum: " + sum);
    }
}
`,
    },
    {
        id: 'go',
        label: 'Go',
        judge0Id: 60,
        monacoLang: 'go',
        extension: '.go',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
        color: '#06b6d4',
        defaultCode: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")

    nums := []int{1, 2, 3, 4, 5}
    sum := 0
    for _, n := range nums {
        sum += n
    }
    fmt.Println("Sum:", sum)
}
`,
    },
    {
        id: 'rust',
        label: 'Rust',
        judge0Id: 73,
        monacoLang: 'rust',
        extension: '.rs',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
        color: '#f97316',
        defaultCode: `fn main() {
    println!("Hello, World!");

    let nums = vec![1, 2, 3, 4, 5];
    let sum: i32 = nums.iter().sum();
    println!("Sum: {}", sum);
}
`,
    },
    {
        id: 'bash',
        label: 'Bash',
        judge0Id: 46,
        monacoLang: 'shell',
        extension: '.sh',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
        color: '#10b981',
        defaultCode: `#!/bin/bash
echo "Hello, World!"

nums=(1 2 3 4 5)
sum=0
for n in "\${nums[@]}"; do
  sum=$((sum + n))
done
echo "Sum: $sum"
`,
    },
];

export const getLanguage = (id) => LANGUAGES.find((l) => l.id === id) || LANGUAGES[0];
