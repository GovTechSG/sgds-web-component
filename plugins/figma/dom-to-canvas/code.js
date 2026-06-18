figma.showUI(__html__, { width: 400, height: 420 });

// SGDS web component → Figma library component key mapping
// Full SGDS web component → Figma library component mapping
var SGDS_COMPONENT_MAP = {
  'sgds-masthead': { key: '18cdf31bb749a24322cc64d6085161d53ed76375', name: 'Official Government Banner' },
  'sgds-mainnav': { key: '357c4643c3d7937f0da2298e4c383b2ee7e82ca5', name: 'Main Nav' },
  'sgds-footer': { key: 'bebf3b1311b700524579ee0c84abed609def47cd', name: 'Footer' },
  'sgds-button': { key: '6f2f3d88022cd929560600e6d9df2016dd542b3c', name: 'Button' },
  'sgds-icon-button': { key: '3d6ef97abfa684a4590866cbb603c44b86427f2d', name: 'Icon button' },
  'sgds-card': { key: 'a80a897e32592c4f2d8aebfafffc1d760669b55f', name: 'Card' },
  'sgds-image-card': { key: '4a9e664f1b163b039023ebeebc3bd2e2f16bb256', name: 'Image card' },
  'sgds-thumbnail-card': { key: 'a80a897e32592c4f2d8aebfafffc1d760669b55f', name: 'Card' },
  'sgds-accordion': { key: 'ffada43a96f710368e420ffd6087b09ee8894502', name: 'Accordion' },
  'sgds-badge': { key: '30f64a9fe1033f49f39d7e77f1b318b0549a852f', name: 'Badge' },
  'sgds-alert': { key: '78d35168e3f57033a677c8bce6d5242e1e771ffc', name: 'Alert' },
  'sgds-breadcrumb': { key: '', name: 'Breadcrumb' },
  'sgds-checkbox': { key: 'cfd682cb134b8cba84738cabe537e7f4973a97af', name: 'Checkbox' },
  'sgds-checkbox-group': { key: 'a8736f77a9aa8db166ba3e6a2af36ea62f231796', name: 'Checkbox group' },
  'sgds-close-button': { key: 'dfa571631b0ed13939f6bc803b89d0cb7b866734', name: 'Close button' },
  'sgds-combo-box': { key: '', name: 'Combo box' },
  'sgds-datepicker': { key: '22707078ef36a68de4d1d59b52d1e774523b3d9e', name: 'Date picker' },
  'sgds-description-list': { key: '', name: 'Description list' },
  'sgds-divider': { key: '0fa48002f60b73b5c40cc5f9960a0d33fa9aede2', name: 'Divider' },
  'sgds-drawer': { key: '286077554b9c670410265a4efddc044d2f79c830', name: 'Drawer' },
  'sgds-dropdown': { key: '8abe77a377974f59945df172f56b462c09d930d2', name: 'Dropdown' },
  'sgds-file-upload': { key: '', name: 'File upload' },
  'sgds-input': { key: '2ef894eecddfbaad424e24480aaaa70c6232d579', name: 'Input' },
  'sgds-link': { key: '', name: 'Link' },
  'sgds-modal': { key: 'b22aedc5141b82416d7943e46a78598d44e4423f', name: 'Modal' },
  'sgds-overflow-menu': { key: '', name: 'Overflow menu' },
  'sgds-pagination': { key: '9e6f67ae6f0a3d36e74371b7e0121a90617f3437', name: 'Pagination' },
  'sgds-progress-bar': { key: '', name: 'Progress bar' },
  'sgds-quantity-toggle': { key: '7a8181de949074a2d44261aa6d6387381ff7fafd', name: 'Quantity toggle' },
  'sgds-radio': { key: '529c74d47e2706156c625441dee324962caf32a9', name: 'Radio' },
  'sgds-radio-group': { key: '1bc0266f520ffce648079e4137dedee58896ff57', name: 'Radio group' },
  'sgds-select': { key: '76689841e9a0e34127817f173746ff90ad4f6d01', name: 'Select' },
  'sgds-sidebar': { key: '', name: 'Sidebar' },
  'sgds-sidenav': { key: '', name: 'Sidenav' },
  'sgds-skeleton': { key: '', name: 'Skeleton' },
  'sgds-spinner': { key: '', name: 'Spinner' },
  'sgds-stepper': { key: 'f2d7340d4a7cae5305c275cdf4536a881006adaa', name: 'Stepper' },
  'sgds-subnav': { key: '', name: 'Subnav' },
  'sgds-switch': { key: '4feb4a7ce800cc003834a757142e2fae22b407cb', name: 'Switch' },
  'sgds-system-banner': { key: '8964354f90723ab11cfecac907643c00b8671489', name: 'System banner' },
  'sgds-tab': { key: '', name: 'Tab' },
  'sgds-table': { key: '3e453c92dfce98aa59f3fdf54743848ba1928478', name: 'Table' },
  'sgds-table-of-contents': { key: '71c683805758b4fd9be63158a990cac4f9b1cc08', name: 'Table of contents' },
  'sgds-textarea': { key: '8309f3c597191757e791ee07827c6d91462e5312', name: 'Text area' },
  'sgds-toast': { key: '1fba52a6b9e5133c161913561e756e717136329b', name: 'Toast' },
  'sgds-tooltip': { key: '', name: 'Tooltip' },
  'sgds-icon-list': { key: '9a32ab706ce2f0a23d974f5d1487d98e551d3b69', name: 'Icon list' },
  'sgds-icon-card': { key: '', name: 'Icon card' },
  'sgds-overflow-menu': { key: '4f6abe52cb03aad3e9201d579a1b9a42ee0b2f96', name: 'Overflow menu' }
};

// SGDS Tailwind class → Figma variable key mapping
// Pattern: sgds:bg-{token} → Figma variable sgds/{path}
// Derived from utility.css: --background-color-{x} → var(--sgds-{y}) → Figma sgds/{y with / separators}
var SGDS_VARIABLE_MAP = {
  // === BACKGROUND COLORS (sgds:bg-*) ===
  // Surface
  'bg-surface-default': 'd918d0396e55942380ceb130c1f621d975314913',
  'bg-surface-raised': '57a7785c6e80f81eb376812d1d707853241cd7fa',
  'bg-surface-inverse': '7da0c8a651bf49067c372ea95516a22dccf5f061',
  // Base backgrounds
  'bg-default': 'c27bcd171762c8c0ad9a476be4a369f405349684',
  'bg-overlay': 'd4b49e071eaf4075926b584df14b1e9f11e8d9f5',
  // Primary
  'bg-primary-surface-default': '4e31c2abf4dba4a98fd41b13705519de1d1bcda5',
  'bg-primary-surface-emphasis': '4a22b9be607a9ff731cd775bafe8866c3a76dc1e',
  'bg-primary-surface-muted': '25e448d40c38270da1e843f026b9567b66ef90b5',
  // Accent
  'bg-accent-surface-default': '5e39d26043c8ab16f6e737b4881b2cf289e5d5dd',
  'bg-accent-surface-emphasis': 'cbef3747bf8914084e3e7155a750b26834db6182',
  'bg-accent-muted': 'e0599475a9936b30b1dbc55141a2ae1894a0cd54',
  // Success
  'bg-success-surface-default': '7f12ac36246da6fc850d3900037bac69b77dc75e',
  'bg-success-surface-muted': 'd178dfec05b713ef5f4ad23e8a488f4f4905b765',
  'bg-success-muted': '41aeb0ea66f438e8409e1b5e6d2afe5e8a4fd6bc',
  // Danger
  'bg-danger-surface-default': 'a4e55bca657460538cf51e74fd69b9f948c0c2dd',
  'bg-danger-surface-muted': '5899fa2dc523e7fb0562577714627b7b8ff6f82f',
  'bg-danger-muted': '6cdf823d79c2fb966f573652132a8fd07caf1d8c',
  // Cyan
  'bg-cyan-surface-default': '979a928bab40a20c5440551370da1e7c47fb9f54',
  'bg-cyan-surface-muted': '59841c52cd5ac832662952b7080493832cce2958',
  'bg-cyan-muted': 'e90e0eecf30e41c444aaf5e473f0736df0392b18',
  // Warning
  'bg-warning-muted': '81cd03ffe33fc729f1b62619fe0a85b927557c03',
  // Purple
  'bg-purple-muted': 'fbc5aed31ebdf89f71fc6f3807b5581fc58cb6a9',
  // Neutral
  'bg-neutral-muted': '59310a3c7d9f8fd669756afc630d635a3f8c24f3'

  // === TEXT COLORS (sgds:text-*) - add keys here as discovered ===
  // To find keys: search_design_system query "sgds/{name}/color-default"
  // e.g. 'text-body-default': 'KEY_HERE',
  // e.g. 'text-heading-default': 'KEY_HERE',
};

// SGDS spacing class → Figma variable key mapping (FLOAT variables)
// Tailwind: sgds:py-layout-md → Figma variable: sgds/layout/padding/md
// Tailwind: sgds:gap-sm → Figma variable: sgds/gap/sm
// Margins converted to padding (Figma has no margins)
var SGDS_SPACING_MAP = {
  // Layout padding (larger, section-level)
  'layout-xs': '89c9ad2f370845cbbba2c434f07333d9fea0f7ab',
  'layout-sm': 'd5b2aa0b802469f8b4ed42f2781d1fec15d9a915',
  'layout-md': '37ec013797e155db991a48db7f514a0851c17cf9',
  'layout-lg': '9e52b034963065e9384655b15af866cba3754093',
  'layout-xl': 'f1b8a67b1b07e04c8964e1b85f73c1f5bbefb426',
  // Layout gap
  'layout-gap-2-xs': '2acc288eaad399a10c49dc50485cbcca972bb3a1',
  'layout-gap-xs': 'e41563056d916eeccf13707fa3ae5d821cc91994',
  'layout-gap-sm': '264a182d25512a99f28631977728b56bd05bff34',
  'layout-gap-md': 'f24863bda1524075c9bf13c4f27f3b9e86c91f5d',
  'layout-gap-lg': 'cac0599410256b10fc64c68b6788aacebdd3e22c',
  'layout-gap-xl': 'e059ad27d69c72d22b384d34214acb43a619deff',
  // Semantic gap (component-level spacing)
  'none': '212274a9abebb673b6a9649d7126ba4f7ad2944b',
  'xs': 'bfe07fc0dea91255cf262edc2166751e45a7087f',
  'sm': '2f173ba36517121bfcd695f8a0d4dc6394a8b534',
  'md': 'c4283dcbcc426b5dcb4c45c4a211233755c0f833',
  'lg': '92b139a8540ede45588e18e28d77fad933b0f66f',
  'xl': 'a09702e317b7ccfd57023b53c1d93f19e9ca7e0f'
};

// Cache for imported variables
var importedVariables = {};

// Cache for imported component sets
var importedComponents = {};

figma.ui.onmessage = async function(msg) {
  if (msg.type === 'import') {
    try {
      var data = msg.data;
      var totalEstimate = countNodes(data);
      var nodeCount = 0;

      // Load common fonts
      await Promise.all([
        figma.loadFontAsync({ family: "Inter", style: "Regular" }),
        figma.loadFontAsync({ family: "Inter", style: "Bold" }),
        figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
        figma.loadFontAsync({ family: "Inter", style: "Medium" }),
        figma.loadFontAsync({ family: "Inter", style: "Light" }),
      ]).catch(function(e) {});

      // Create root frame
      var pageWidth = data.pageWidth || data.width || 1440;
      var pageHeight = data.pageHeight || data.height || 900;

      var rootFrame = figma.createFrame();
      rootFrame.name = data.title || "Imported Page";
      rootFrame.resize(pageWidth, pageHeight);
      rootFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      rootFrame.clipsContent = true;

      // Add single 12-column layout grid guide to root frame (Ctrl+G to toggle)
      rootFrame.layoutGrids = [{
        pattern: 'COLUMNS',
        alignment: 'MIN',
        count: 12,
        gutterSize: 32,
        sectionSize: 80,
        offset: 100,
        visible: true
      }];

      // Position away from existing content
      var maxX = 0;
      for (var i = 0; i < figma.currentPage.children.length; i++) {
        var child = figma.currentPage.children[i];
        maxX = Math.max(maxX, child.x + child.width);
      }
      rootFrame.x = maxX + 100;
      rootFrame.y = 0;

      var rootOffsetX = data.x || 0;
      var rootOffsetY = data.y || 0;

      if (data.children) {
        for (var c = 0; c < data.children.length; c++) {
          var rootSibTags = data.children.map(function(ch) { return ch.tag || ''; });
          await createNode(data.children[c], rootFrame, rootOffsetX, rootOffsetY, rootSibTags);
          nodeCount++;
          if (nodeCount % 5 === 0) {
            figma.ui.postMessage({
              type: 'progress',
              percent: Math.round((nodeCount / totalEstimate) * 100)
            });
          }
        }
      }

      figma.viewport.scrollAndZoomIntoView([rootFrame]);
      figma.ui.postMessage({ type: 'done', nodeCount: totalEstimate });
    } catch (err) {
      figma.ui.postMessage({ type: 'error', message: err.message || String(err) });
    }
  }
};

function countNodes(node) {
  var count = 1;
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      count += countNodes(node.children[i]);
    }
  }
  return count;
}

// Check if a tag is an SGDS component with a Figma mapping
function isSgdsComponent(tag) {
  if (!tag) return false;
  var mapping = SGDS_COMPONENT_MAP[tag];
  return mapping && mapping.key;
}

// Check if sgds-masthead should be skipped (Main Nav component already includes it)
function shouldSkipMasthead(data, parent) {
  if (data.tag !== 'sgds-masthead') return false;
  // If sgds-mainnav is a sibling, skip masthead since Main Nav includes it
  if (parent && parent._childTags) {
    return parent._childTags.indexOf('sgds-mainnav') >= 0;
  }
  return false;
}

// Import and create an SGDS component instance
async function createSgdsComponent(data, parent, parentX, parentY, siblingTags) {
  var mapping = SGDS_COMPONENT_MAP[data.tag];
  if (!mapping || !mapping.key) return null;

  // Import if not cached
  if (!importedComponents[data.tag]) {
    try {
      var componentSet = await figma.importComponentSetByKeyAsync(mapping.key);
      importedComponents[data.tag] = componentSet;
    } catch (e) {
      // If import fails, fall back to frame
      return null;
    }
  }

  var componentSet = importedComponents[data.tag];
  var variant = componentSet.defaultVariant || componentSet.children[0];
  var instance = variant.createInstance();

  instance.name = mapping.name;

  var posX = (data.x || 0) - parentX;
  var posY = (data.y || 0) - parentY;

  // If this is sgds-mainnav and sgds-masthead was skipped (because Main Nav includes it),
  // position at y:0 since the component renders its own banner
  if (data.tag === 'sgds-mainnav' && siblingTags && siblingTags.indexOf('sgds-masthead') >= 0) {
    posY = 0;
  }

  instance.x = posX;
  instance.y = posY;

  // Resize to match DOM dimensions
  if (data.width && data.width > 0 && data.height && data.height > 0) {
    instance.resize(data.width, data.height);
  } else if (data.width && data.width > 0) {
    instance.resize(data.width, instance.height);
  }

  parent.appendChild(instance);

  // Apply component-specific content from DOM children
  if (data.tag === 'sgds-card') {
    await applyCardContent(instance, data);
  }
  if (data.tag === 'sgds-button') {
    await applyButtonContent(instance, data);
  }
  if (data.tag === 'sgds-badge') {
    await applyBadgeContent(instance, data);
  }

  return instance;
}

// Generic: apply DOM text to any SGDS component's TEXT properties
async function applyComponentText(instance, data) {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  } catch (e) {}

  // Collect all text from DOM children
  var texts = [];
  collectTexts(data, texts);
  if (texts.length === 0 && data.text) {
    texts.push(data);
  }
  if (texts.length === 0) return;

  // Get all TEXT properties from the instance (and nested instances)
  var textProps = getTextProperties(instance);

  // Match DOM texts to component TEXT properties
  // Strategy: match by content role (title→title, description→description, label→label)
  // Fallback: match in order
  var domTexts = texts.map(function(t) { return t.text; });

  if (domTexts.length === 1 && textProps.length >= 1) {
    // Single text — set on the most likely property (label, title, or first)
    var labelProp = textProps.find(function(p) { return p.key.toLowerCase().indexOf('label') >= 0; });
    var titleProp = textProps.find(function(p) { return p.key.toLowerCase().indexOf('title') >= 0; });
    var target = labelProp || titleProp || textProps[0];
    if (target) {
      target.instance.setProperties(makeProps(target.key, domTexts[0]));
    }
  } else if (domTexts.length >= 2) {
    // Multiple texts — try to match title + description
    // Sort by font size/weight to identify title vs description
    var sorted = texts.slice().sort(function(a, b) {
      var aSize = (a.textStyles && a.textStyles.fontSize) || 16;
      var bSize = (b.textStyles && b.textStyles.fontSize) || 16;
      return bSize - aSize; // larger first = title
    });

    var titleText = sorted[0] ? sorted[0].text : '';
    var descTexts = sorted.slice(1).map(function(t) { return t.text; });

    // Find title property
    var tProp = textProps.find(function(p) {
      var k = p.key.toLowerCase();
      return k.indexOf('title') >= 0 || k.indexOf('header') >= 0 || k.indexOf('heading') >= 0;
    });
    // Find description property
    var dProp = textProps.find(function(p) {
      var k = p.key.toLowerCase();
      return k.indexOf('desc') >= 0 || k.indexOf('text') >= 0 || k.indexOf('content') >= 0;
    });
    // Find label property
    var lProp = textProps.find(function(p) {
      var k = p.key.toLowerCase();
      return k.indexOf('label') >= 0;
    });

    if (tProp && titleText) {
      tProp.instance.setProperties(makeProps(tProp.key, titleText));
    }
    if (dProp && descTexts.length > 0) {
      dProp.instance.setProperties(makeProps(dProp.key, descTexts[0]));
    }
    if (lProp && !tProp && titleText) {
      lProp.instance.setProperties(makeProps(lProp.key, titleText));
    }

    // If we have a button label specifically
    if (data.tag === 'sgds-button' && lProp) {
      lProp.instance.setProperties(makeProps(lProp.key, domTexts[0]));
    }
  }
}

// Helper to make a single-key property object
function makeProps(key, value) {
  var obj = {};
  obj[key] = value;
  return obj;
}

// Get all TEXT type properties from an instance and its nested instances
function getTextProperties(instance) {
  var results = [];
  var props = instance.componentProperties;
  for (var key in props) {
    if (props[key].type === 'TEXT') {
      results.push({ key: key, value: props[key].value, instance: instance });
    }
  }
  // Check nested instances
  var nested = instance.findAllWithCriteria({ types: ['INSTANCE'] });
  for (var i = 0; i < nested.length; i++) {
    var nestedProps = nested[i].componentProperties;
    for (var nKey in nestedProps) {
      if (nestedProps[nKey].type === 'TEXT') {
        results.push({ key: nKey, value: nestedProps[nKey].value, instance: nested[i] });
      }
    }
  }
  return results;
}

// Extract text from sgds-card children and set on Figma Card instance
async function applyCardContent(instance, data) {
  if (!data.children) return;

  // Flatten all text nodes from card children to find title + description
  var texts = [];
  collectTexts(data, texts);

  // Heuristic: find title (larger font / bold) and description (smaller / regular)
  var title = '';
  var description = '';

  for (var i = 0; i < texts.length; i++) {
    var t = texts[i];
    var fs = (t.textStyles && t.textStyles.fontSize) || 16;
    var fw = (t.textStyles && t.textStyles.fontWeight) || '400';

    // Skip numbered step indicators (single digit text with bg color = step number)
    if (t.text.length <= 2 && t.styles && t.styles.backgroundColor) continue;

    // Title: larger font or semibold/bold, not yet assigned
    if (!title && (fs >= 20 || parseInt(fw) >= 600)) {
      title = t.text;
    } else if (!description && fs <= 20 && parseInt(fw) < 600) {
      description = t.text;
    }
  }

  // Set Card header properties
  if (title || description) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });

      var cardHeader = instance.findOne(function(n) {
        return n.name === "Card header" && n.type === "INSTANCE";
      });
      if (cardHeader) {
        var props = {};
        if (title) props["↳ Edit text #29055:26"] = title;
        if (description) props["↳ Edit text  #30610:3"] = description;
        cardHeader.setProperties(props);
      }
    } catch (e) {}
  }

  // Enable Tinted + upper slot if card has a step number
  var stepNum = findStepNumber(data);
  if (stepNum) {
    try {
      instance.setProperties({ "Tinted#29055:104": true });
      var upperSlot = instance.findOne(function(n) { return n.name === "[upper slot]"; });
      if (upperSlot) {
        upperSlot.visible = true;
        var descInSlot = upperSlot.findOne(function(n) { return n.name === "description" && n.type === "TEXT"; });
        if (descInSlot) {
          await figma.loadFontAsync({ family: "Inter", style: "Regular" });
          descInSlot.characters = stepNum;
        }
      }
    } catch (e) {}
  }
}

// Find step number indicator in card children (single digit with background color)
function findStepNumber(data) {
  if (!data.children) return null;
  for (var i = 0; i < data.children.length; i++) {
    var child = data.children[i];
    if (child.text && child.text.length <= 2 && child.styles && child.styles.backgroundColor) {
      return child.text;
    }
    // Recurse
    var found = findStepNumber(child);
    if (found) return found;
  }
  return null;
}

// Add a small annotation badge to SGDS component frames
async function addComponentAnnotation(frame, tag) {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  } catch (e) {
    return;
  }

  var label = figma.createText();
  label.characters = '<' + tag + '>';
  label.fontSize = 10;
  label.fontName = { family: "Inter", style: "Semi Bold" };
  label.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  label.textAutoResize = "WIDTH_AND_HEIGHT";

  // Background badge
  var badge = figma.createFrame();
  badge.name = "annotation: " + tag;
  badge.resize(label.width + 8, 16);
  badge.cornerRadius = 4;
  badge.fills = [{ type: 'SOLID', color: { r: 0.64, g: 0.16, b: 0.68 }, opacity: 0.9 }];

  badge.appendChild(label);
  label.x = 4;
  label.y = 2;

  // Position badge at top-left of the frame
  frame.appendChild(badge);
  badge.x = 0;
  badge.y = -18;

  return badge;
}

// Recursively collect all text nodes
function collectTexts(node, results) {
  if (node.type === 'text' && node.text) {
    results.push(node);
  }
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      collectTexts(node.children[i], results);
    }
  }
}

// Apply text label to Button instance
async function applyButtonContent(instance, data) {
  var label = data.text || '';
  if (!label && data.children) {
    var texts = [];
    collectTexts(data, texts);
    if (texts.length > 0) label = texts[0].text;
  }
  if (label) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
      instance.setProperties({ "Edit button label#12484:5": label });
    } catch (e) {}
  }
}

// Apply text label to Badge instance
async function applyBadgeContent(instance, data) {
  var label = data.text || '';
  if (!label && data.children) {
    var texts = [];
    collectTexts(data, texts);
    if (texts.length > 0) label = texts[0].text;
  }
  if (label) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
      instance.setProperties({ "Edit label#13032:18": label });
    } catch (e) {}
  }
}

async function createNode(data, parent, parentX, parentY, siblingTags) {
  if (!data || !data.type) return null;

  // Skip sgds-masthead if sgds-mainnav is a sibling (Main Nav already includes banner)
  if (data.tag === 'sgds-masthead' && siblingTags && siblingTags.indexOf('sgds-mainnav') >= 0) {
    return null;
  }

  // Skip overlay elements — apply as fill on parent instead of creating child frame
  // Overlays are position:absolute in CSS and same size as parent (they shouldn't be in auto-layout)
  var nodeName = data.name || '';
  if (nodeName.indexOf('sgds:bg-overlay') >= 0 || nodeName.indexOf('bg-overlay') >= 0) {
    // Apply semi-transparent dark fill to the parent
    if (parent && parent.type === 'FRAME') {
      var existingFills = parent.fills ? JSON.parse(JSON.stringify(parent.fills)) : [];
      existingFills.push({
        type: 'SOLID',
        color: { r: 0, g: 0, b: 0 },
        opacity: 0.5
      });
      parent.fills = existingFills;
    }
    return null;
  }

  // Import library components only for structurally complex web components
  // (their shadow DOM internals don't capture well as raw frames)
  if (data.tag && isSgdsComponent(data.tag)) {
    var sgdsNode = await createSgdsComponent(data, parent, parentX, parentY, siblingTags);
    if (sgdsNode) return sgdsNode;
  }

  if (data.type === 'text' && data.text) {
    return await createTextNode(data, parent, parentX, parentY);
  }

  if (data.type === 'image') {
    return createImageNode(data, parent, parentX, parentY);
  }

  return await createFrameNode(data, parent, parentX, parentY);
}

// Parse sgds: class names from node name and try to bind variables
async function applyTokenBindings(node, data) {
  var name = data.name || '';

  // Look for sgds:bg-* pattern (background color)
  var bgMatch = name.match(/sgds:bg-([a-z0-9-]+)/);
  if (bgMatch) {
    var bgToken = 'bg-' + bgMatch[1];
    var bgKey = findVariableKey(bgToken);
    if (bgKey) {
      try {
        var bgVar = await importVariable(bgKey);
        if (bgVar) {
          var paint = figma.variables.setBoundVariableForPaint(
            { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
            'color',
            bgVar
          );
          node.fills = [paint];
          return true;
        }
      } catch (e) {}
    }
  }

  // Look for sgds:text-* pattern (text color) — for text nodes
  var textMatch = name.match(/sgds:text-([a-z0-9-]+)/);
  if (textMatch && node.type === 'TEXT') {
    var textToken = 'text-' + textMatch[1];
    var textKey = findVariableKey(textToken);
    if (textKey) {
      try {
        var textVar = await importVariable(textKey);
        if (textVar) {
          var textPaint = figma.variables.setBoundVariableForPaint(
            { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
            'color',
            textVar
          );
          node.fills = [textPaint];
        }
      } catch (e) {}
    }
  }

  return false;
}

// Look up Figma variable key from tailwind class token
function findVariableKey(token) {
  // Direct match: "bg-surface-default" → key
  if (SGDS_VARIABLE_MAP[token]) return SGDS_VARIABLE_MAP[token];

  // Try without "bg-" prefix for surface tokens: "bg-surface-default" already handled above
  // Try alternate patterns for fuzzy matching
  // e.g. "bg-primary-default" could be "bg-primary-surface-default"
  var withSurface = token.replace(/^(bg-[a-z]+)-(default|emphasis|muted)$/, '$1-surface-$2');
  if (SGDS_VARIABLE_MAP[withSurface]) return SGDS_VARIABLE_MAP[withSurface];

  return null;
}

async function importVariable(key) {
  if (importedVariables[key]) return importedVariables[key];
  try {
    var variable = await figma.variables.importVariableByKeyAsync(key);
    importedVariables[key] = variable;
    return variable;
  } catch (e) {
    return null;
  }
}

async function createFrameNode(data, parent, parentX, parentY) {
  var frame = figma.createFrame();
  frame.name = data.name || data.tag || "frame";

  frame.x = (data.x || 0) - parentX;
  frame.y = (data.y || 0) - parentY;
  frame.resize(Math.max(data.width || 1, 1), Math.max(data.height || 1, 1));

  var styles = data.styles || {};

  // Try to bind SGDS variable token first
  var boundToVariable = await applyTokenBindings(frame, data);

  if (!boundToVariable) {
    if (styles.backgroundColor) {
      var bg = styles.backgroundColor;
      frame.fills = [{
        type: 'SOLID',
        color: { r: bg.r, g: bg.g, b: bg.b },
        opacity: bg.a !== undefined ? bg.a : 1
      }];
    } else {
      frame.fills = [];
    }
  }

  if (styles.borderRadius) {
    frame.cornerRadius = styles.borderRadius;
  }

  if (styles.border && styles.border.width > 0 && styles.border.color) {
    var bc = styles.border.color;
    frame.strokes = [{
      type: 'SOLID',
      color: { r: bc.r, g: bc.g, b: bc.b },
      opacity: bc.a !== undefined ? bc.a : 1
    }];
    frame.strokeWeight = styles.border.width;
  }

  if (styles.boxShadow) {
    var s = styles.boxShadow;
    var sc = s.color || { r: 0, g: 0, b: 0, a: 0.25 };
    frame.effects = [{
      type: 'DROP_SHADOW',
      visible: true,
      blendMode: 'NORMAL',
      offset: { x: s.offsetX, y: s.offsetY },
      radius: s.blur,
      spread: s.spread || 0,
      color: { r: sc.r, g: sc.g, b: sc.b, a: sc.a !== undefined ? sc.a : 0.25 }
    }];
  }

  if (styles.opacity !== undefined) {
    frame.opacity = styles.opacity;
  }

  frame.clipsContent = !!styles.clipContent;

  parent.appendChild(frame);


  // Simple absolute positioning — honour DOM dimensions exactly
  var thisX = data.x || 0;
  var thisY = data.y || 0;

  if (data.children) {
    for (var i = 0; i < data.children.length; i++) {
      var sibTags = data.children.map(function(ch) { return ch.tag || ''; });
      await createNode(data.children[i], frame, thisX, thisY, sibTags);
    }
  }

  return frame;
}

// Parse spacing classes and apply padding/gap with variable bindings
async function applySpacing(frame, name) {
  if (!name) return;

  // Parse all sgds: spacing classes
  var classes = name.split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    var cls = classes[i];
    if (cls.indexOf('sgds:') !== 0) continue;
    var token = cls.replace('sgds:', '');

    // Gap: sgds:gap-sm, sgds:gap-layout-md
    var gapMatch = token.match(/^gap-(.+)$/);
    if (gapMatch) {
      var gapKey = resolveSpacingKey(gapMatch[1]);
      if (gapKey) {
        var gapVar = await importVariable(gapKey);
        if (gapVar) {
          // Need auto-layout for gap
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('itemSpacing', gapVar);
        }
      }
      continue;
    }

    // Padding Y: sgds:py-layout-md, sgds:py-xl
    var pyMatch = token.match(/^py-(.+)$/);
    if (pyMatch) {
      var pyKey = resolveSpacingKey(pyMatch[1]);
      if (pyKey) {
        var pyVar = await importVariable(pyKey);
        if (pyVar) {
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('paddingTop', pyVar);
          frame.setBoundVariable('paddingBottom', pyVar);
        }
      }
      continue;
    }

    // Padding X: sgds:px-layout-lg, sgds:px-xl
    var pxMatch = token.match(/^px-(.+)$/);
    if (pxMatch) {
      var pxKey = resolveSpacingKey(pxMatch[1]);
      if (pxKey) {
        var pxVar = await importVariable(pxKey);
        if (pxVar) {
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('paddingLeft', pxVar);
          frame.setBoundVariable('paddingRight', pxVar);
        }
      }
      continue;
    }

    // Padding all: sgds:p-xl
    var pMatch = token.match(/^p-(.+)$/);
    if (pMatch && !token.match(/^p[xytblr]-/)) {
      var pKey = resolveSpacingKey(pMatch[1]);
      if (pKey) {
        var pVar = await importVariable(pKey);
        if (pVar) {
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('paddingTop', pVar);
          frame.setBoundVariable('paddingBottom', pVar);
          frame.setBoundVariable('paddingLeft', pVar);
          frame.setBoundVariable('paddingRight', pVar);
        }
      }
      continue;
    }

    // Padding top: sgds:pt-*
    var ptMatch = token.match(/^pt-(.+)$/);
    if (ptMatch) {
      var ptKey = resolveSpacingKey(ptMatch[1]);
      if (ptKey) {
        var ptVar = await importVariable(ptKey);
        if (ptVar) {
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('paddingTop', ptVar);
        }
      }
      continue;
    }

    // Padding bottom: sgds:pb-*
    var pbMatch = token.match(/^pb-(.+)$/);
    if (pbMatch) {
      var pbKey = resolveSpacingKey(pbMatch[1]);
      if (pbKey) {
        var pbVar = await importVariable(pbKey);
        if (pbVar) {
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('paddingBottom', pbVar);
        }
      }
      continue;
    }

    // Margin → Padding conversion (Figma has no margins)
    // sgds:mb-xl → paddingBottom, sgds:mt-lg → paddingTop
    var mbMatch = token.match(/^mb-(.+)$/);
    if (mbMatch) {
      var mbKey = resolveSpacingKey(mbMatch[1]);
      if (mbKey) {
        var mbVar = await importVariable(mbKey);
        if (mbVar) {
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('paddingBottom', mbVar);
        }
      }
      continue;
    }

    var mtMatch = token.match(/^mt-(.+)$/);
    if (mtMatch) {
      var mtKey = resolveSpacingKey(mtMatch[1]);
      if (mtKey) {
        var mtVar = await importVariable(mtKey);
        if (mtVar) {
          if (frame.layoutMode === 'NONE') frame.layoutMode = 'VERTICAL';
          frame.setBoundVariable('paddingTop', mtVar);
        }
      }
      continue;
    }
  }
}

// Parse column span from sgds-col-* class name
// Prioritizes largest breakpoint: sgds-col-lg-4 > sgds-col-md-6 > sgds-col-4
function parseColSpan(name) {
  // Check from largest breakpoint down: 2-xl, xl, lg, md, sm, base
  var match2xl = name.match(/sgds-col-2-xl-(\d+)/);
  if (match2xl) return parseInt(match2xl[1]);

  var matchXl = name.match(/sgds-col-xl-(\d+)/);
  if (matchXl) return parseInt(matchXl[1]);

  var matchLg = name.match(/sgds-col-lg-(\d+)/);
  if (matchLg) return parseInt(matchLg[1]);

  var matchMd = name.match(/sgds-col-md-(\d+)/);
  if (matchMd) return parseInt(matchMd[1]);

  var matchSm = name.match(/sgds-col-sm-(\d+)/);
  if (matchSm) return parseInt(matchSm[1]);

  // Base: sgds-col-4 (but not sgds-col-lg-4 etc.)
  var matchBase = name.match(/sgds-col-(\d+)/);
  if (matchBase) return parseInt(matchBase[1]);

  return 0;
}

// Resolve a spacing token to a variable key
// e.g. "layout-md" → layout padding md key, "sm" → semantic gap sm key
function resolveSpacingKey(token) {
  // Direct match: "sm", "md", "xl", "layout-md"
  if (SGDS_SPACING_MAP[token]) return SGDS_SPACING_MAP[token];

  // "layout-md" for padding context
  if (SGDS_SPACING_MAP['layout-' + token]) return SGDS_SPACING_MAP['layout-' + token];

  return null;
}

async function createTextNode(data, parent, parentX, parentY) {
  var textNode = figma.createText();
  textNode.name = data.name || "text";

  textNode.x = (data.x || 0) - parentX;
  textNode.y = (data.y || 0) - parentY;

  var ts = data.textStyles || {};
  var fontFamily = ts.fontFamily || "Inter";
  var fontWeight = ts.fontWeight || "400";
  var figmaStyle = weightToStyle(fontWeight);

  try {
    await figma.loadFontAsync({ family: fontFamily, style: figmaStyle });
    textNode.fontName = { family: fontFamily, style: figmaStyle };
  } catch (e) {
    textNode.fontName = { family: "Inter", style: "Regular" };
  }

  textNode.characters = data.text || "";

  // Determine if text is single-line or multi-line
  var lineHeight = (ts.lineHeight && ts.lineHeight > 0) ? ts.lineHeight : ((ts.fontSize || 16) * 1.2);
  var isSingleLine = data.height <= lineHeight * 1.5;

  if (isSingleLine) {
    // Single-line: let text auto-size width to avoid wrapping
    textNode.textAutoResize = "WIDTH_AND_HEIGHT";
  } else if (data.width && data.width > 0) {
    // Multi-line: fix width, let height grow
    textNode.resize(data.width, Math.max(data.height || 20, 1));
    textNode.textAutoResize = "HEIGHT";
  }

  if (ts.fontSize) textNode.fontSize = ts.fontSize;

  if (ts.lineHeight && ts.lineHeight > 0) {
    textNode.lineHeight = { unit: "PIXELS", value: ts.lineHeight };
  }

  if (ts.letterSpacing) {
    textNode.letterSpacing = { unit: "PIXELS", value: ts.letterSpacing };
  }

  if (ts.textAlign) {
    var alignMap = { left: 'LEFT', center: 'CENTER', right: 'RIGHT', justify: 'JUSTIFIED', start: 'LEFT', end: 'RIGHT' };
    textNode.textAlignHorizontal = alignMap[ts.textAlign] || 'LEFT';
  }

  if (ts.color) {
    textNode.fills = [{
      type: 'SOLID',
      color: { r: ts.color.r, g: ts.color.g, b: ts.color.b },
      opacity: ts.color.a !== undefined ? ts.color.a : 1
    }];
  }

  parent.appendChild(textNode);
  return textNode;
}

function createImageNode(data, parent, parentX, parentY) {
  var rect = figma.createRectangle();
  rect.name = data.name || "image";

  rect.x = (data.x || 0) - parentX;
  rect.y = (data.y || 0) - parentY;
  rect.resize(Math.max(data.width || 100, 1), Math.max(data.height || 100, 1));

  rect.fills = [{ type: 'SOLID', color: { r: 0.85, g: 0.85, b: 0.85 } }];

  var styles = data.styles || {};
  if (styles.borderRadius) {
    rect.cornerRadius = styles.borderRadius;
  }

  parent.appendChild(rect);
  return rect;
}

function weightToStyle(weight) {
  var w = parseInt(weight) || 400;
  if (w <= 100) return "Thin";
  if (w <= 200) return "Extra Light";
  if (w <= 300) return "Light";
  if (w <= 400) return "Regular";
  if (w <= 500) return "Medium";
  if (w <= 600) return "Semi Bold";
  if (w <= 700) return "Bold";
  if (w <= 800) return "Extra Bold";
  return "Black";
}
