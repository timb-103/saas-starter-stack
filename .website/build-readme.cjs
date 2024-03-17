// This script is used to build the README file by combining the header, sections, and contribute files with the items files.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to sanitize names for use in links
function sanitizeName(name) {
    console.log(`Before: ${name}`);
    name = name.trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/&/g, 'and')
        .replace(/[^\w-]+/g, '');
    console.log(`After: ${name}`);
    return encodeURIComponent(name)
}

// Start the content with the header
let content = fs.readFileSync(path.join(__dirname, '../partials/header.md'), 'utf8');

// Read the sections file
const sectionsFilePath = path.join(__dirname, '../partials/sections.md');
const sectionsFileContent = fs.readFileSync(sectionsFilePath, 'utf-8');
const {sections, categories} = matter(sectionsFileContent).data;

// Add the table of contents
content += '## Table of Contents\n';
for (const section of sections) {
    content += '- [' + section.name + '](#' + sanitizeName(section.name) + ')\n';
    if (section.name === 'Tools') {
        for (const category of categories) {
            content += '    - [' + category.name + '](#' + sanitizeName(category.name) + ')\n';
        }
    }
}
// Add the contribute link to the table of contents
content += '- [Contribute](#contribute)\n';
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

    // Group the items by category if the section is Tools
    const itemsByCategory = items.reduce((groups, item) => {
        if (item.category) {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        }
        return groups;
    }, {});

    // Add the items to the content
    if (section.name === 'Tools') {
        for (const category of categories) {
            content += '### ' + category.name + '\n';
            if (category.description) {
                // Uncomment this line to add the category description to the content
                //content += category.description + '\n';
            }
            if (itemsByCategory[category.name]) {
                itemsByCategory[category.name].sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order - b.order;
                    } else {
                        return a.name.localeCompare(b.name);
                    }
                });
                for (const item of itemsByCategory[category.name]) {
                    content += '- [' + item.name + '](' + item.link + ') - ' + item.description + '\n';
                }
            }
            content += '\n';
        }
    } else {

        // Sort the items by order if it exists, otherwise by name
        items.sort((a, b) => {
            if (a.order && b.order) {
                return a.order - b.order;
            } else {
                return a.name.localeCompare(b.name);
            }
        });

        // Add the items to the content
        for (const item of items) {
            content += '- [' + item.name + '](' + item.link + ') - ' + item.description + '\n';
        }

        content += '\n';

    }

}

// Add the contribution section
const contributePath = path.join(__dirname, '../partials/contribute.md');
const contributeContent = fs.readFileSync(contributePath, 'utf-8');
content += contributeContent;

// Write the combined content to the README file
fs.writeFileSync(path.join(__dirname, '../README.md'), content);