// const fs = require('fs');
// const path = require('path');
// const matter = require('gray-matter');
//
// // Directories where the markdown files are stored
// const toolsDir = path.join(__dirname, '../tools');
// const guidesDir = path.join(__dirname, '../guide');
// const interviewsDir = path.join(__dirname, '../interviews');
//
// // Read the content of the header file
// const headerPath = path.join(__dirname, '../partials/header.md');
// const headerContent = fs.readFileSync(headerPath, 'utf-8');
//
// // Start the content with the header
// let content = headerContent;
//
// // Function to read the content of each file and extract the frontmatter
// const processFiles = (dir, prependFile) => {
//     const files = fs.readdirSync(dir);
//     let items = [];
//
//     // If there's a file to prepend, add its content first
//     if (prependFile) {
//         const prependFilePath = path.join(__dirname, '../partials', prependFile);
//         const prependFileContent = fs.readFileSync(prependFilePath, 'utf-8');
//         content += prependFileContent + '\n';
//     }
//
//     for (const file of files) {
//         if (path.extname(file) === '.md') {
//             const filePath = path.join(dir, file);
//             const fileContent = fs.readFileSync(filePath, 'utf-8');
//             const parsedContent = matter(fileContent);
//             items.push({
//                 name: file.replace('.md', ''),
//                 content: parsedContent.content,
//                 category: parsedContent.data.category
//             });
//         }
//     }
//
//     // Sort the items by category
//     if (dir === toolsDir) {
//         items.sort((a, b) => a.category.localeCompare(b.category));
//
//         // Add the items to the content
//         let currentCategory = '';
//         for (const item of items) {
//             // If the category has changed, add a new header
//             if (item.category !== currentCategory) {
//                 currentCategory = item.category;
//                 content += '### ' + currentCategory + '\n';
//             }
//             content += '- [' + item.name + '](#' + item.name + ')\n';
//             content += item.content + '\n';
//         }
//     } else {
//         addItemsToContent(items);
//     }
// }
//
// // Function to add the items to the content
// const addItemsToContent = (items) => {
//     for (const item of items) {
//         content += '### ' + item.name + '\n';
//         content += item.content + '\n';
//     }
// }
//
// // Process the files in each directory
// processFiles(guidesDir, 'guide.md');
// processFiles(interviewsDir, 'interviews.md');
// processFiles(toolsDir, 'tools.md');
//
// // Add the contribution section
// const contributePath = path.join(__dirname, '../partials/contribute.md');
// const contributeContent = fs.readFileSync(contributePath, 'utf-8');
// content += contributeContent;
//
// // Write the combined content to the README file
// fs.writeFileSync(path.join(__dirname, '../README.md'), content);

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Start the content with the header
let content = fs.readFileSync(path.join(__dirname, '../partials/header.md'), 'utf8');

// Read the sections file
const sectionsFilePath = path.join(__dirname, '../partials/sections.md');
const sectionsFileContent = fs.readFileSync(sectionsFilePath, 'utf-8');
const { sections, categories } = matter(sectionsFileContent).data;

// Add the table of contents
content += '## Table of Contents\n';
for (const section of sections) {
    content += '- [' + section.name + '](#' + section.name.toLowerCase() + ')\n';
    if (section.name === 'Tools') {
        for (const category of categories) {
            content += '    - [' + category.name + '](#' + category.name.toLowerCase().replace(/ /g, '-') + ')\n';
        }
    }
}
content += '\n';

// Add the sections to the content
for (const section of sections) {
    content += '## ' + section.name + '\n';
    if (section.description) {
        content += section.description + '\n';
    }

    // Add the items for this section to the content
    const itemsDir = path.join(__dirname, '../items');
    const sectionDirs = fs.readdirSync(itemsDir);
    let items = [];
    for (const sectionDir of sectionDirs) {
        const sectionDirPath = path.join(itemsDir, sectionDir);
        if (fs.statSync(sectionDirPath).isDirectory()) {
            const itemFiles = fs.readdirSync(sectionDirPath);
            for (const itemFile of itemFiles) {
                const itemFilePath = path.join(sectionDirPath, itemFile);
                const itemFileContent = fs.readFileSync(itemFilePath, 'utf-8');
                const item = matter(itemFileContent).data;

                // Check if the item's section matches the current section
                if (item.section === section.name) {
                    // Check if the item's category is valid or if it doesn't have a category
                    if (!item.category || categories.find(category => category.name === item.category)) {
                        items.push(item);
                    }
                }
            }
        }
    }

    // log in the terminal, the items
    console.log(items);

    // Sort the items by order if it exists, otherwise by name
    items.sort((a, b) => {
        if (a.order && b.order) {
            return a.order - b.order;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    // Add the items to the content
    let currentCategory = '';
    for (const item of items) {
        // If the category has changed, add a new header
        if (item.category !== currentCategory) {
            currentCategory = item.category;
            if (section.name === 'Tools') {
                content += '### ' + currentCategory + '\n';
            }
        }
        content += '- [' + item.name + '](' + item.link + ') - ' + item.description + '\n';
    }

    // // Add the items to the content
    // for (const item of items) {
    //     content += '- [' + item.name + '](' + item.link + ') - ' + item.description + '\n';
    // }

}

// Add the contribution section
const contributePath = path.join(__dirname, '../partials/contribute.md');
const contributeContent = fs.readFileSync(contributePath, 'utf-8');
content += contributeContent;

// Write the combined content to the README file
fs.writeFileSync(path.join(__dirname, '../README.md'), content);