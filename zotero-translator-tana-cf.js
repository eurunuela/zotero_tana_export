{
  "translatorID": "dda092d2-a257-46af-b9a3-2f04a55cb04h",
    "translatorType": 2,
      "label": "Tana Metadata Export",
        "creator": "CortexFutura based on Stian Haklev's, Joel Chan's, and Joshua Hall's work",
          "editedBy": "Eneko Uruñuela",
            "target": "md",
              "minVersion": "2.0",
                "maxVersion": "",
                  "priority": 200,
                    "inRepository": false,
                      "lastUpdated": "2023-02-28 - 19:51"
}

function doExport() {
  Zotero.write('%%tana%%\n');
  var item;
  while (item = Zotero.nextItem()) {
    // ref
    Zotero.write('- ' + item.title + ' #paper\n');

    // Citekey
    //Zotero.write('  - citekey:: ' + item.citationKey + '\n');
    // Set citekey
    if (item.citationKey !== undefined && item.citationKey !== '') {
      // Preferred citation key reference syntax
      var citationKeyS = '@' + item.citationKey;

      // Write the citation key
      Zotero.write('  - Citation key:: ' + citationKeyS + '\n');
    }

    // Set the author list
    if (item.creators !== undefined) {
      Zotero.write('  - Author::\n');
      for (author in item.creators) {
        if (item.creators[author].firstName !== undefined && item.creators[author].lastName !== undefined) {
          // Use the full name of the author. Should be the most common situation
          Zotero.write('    - [[' + (item.creators[author].firstName || '') + ' ' + (item.creators[author].lastName + ' #author]]' || '') + '\n');
        } else if (item.creators[author].lastName !== undefined) {
          // Only use the last name
          Zotero.write('    - [['(item.creators[author].lastName + ' #author]]' || '') + '\n');
        } else {
          // Hypothetically impossible unless your DB is inconsistent for some reason
          Zotero.write('    - Unknown author');
        }
      }
      Zotero.write('\n');
    }

    // year
    var date = Zotero.Utilities.strToDate(item.date);
    var dateS = (date.year) ? date.year : item.date;
    Zotero.write('  - Year:: ')
    Zotero.write((dateS || '') + '\n')

    // publication
    Zotero.write('  - Journal:: ')
    Zotero.write((item.publicationTitle || '') + ' #[[journal]]\n')

    // zotero link
    var library_id = item.libraryID ? item.libraryID : 0;
    var itemLink = 'zotero://select/items/' + library_id + '_' + item.key;

    Zotero.write('  - Zotero link:: ')
    Zotero.write('[Zotero Link](' + itemLink + ')\n')

    // url with citation
    Zotero.write('  - URL:: ' + (item.url || '') + '\n')

    // Status
    Zotero.write('  - Status:: Unread\n')

    // Abstract. Change the \n to a multiline string
    Zotero.write('  - Abstract:: ' + (item.abstractNote || '').replace(/\n/g, ' ') + '\n')
  }
}
