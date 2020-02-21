'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {};

const isDef = (v) => v != null;
const isComplexType = (o) => {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};

let scopeId;
let contentRef;
let hostTagName;
let useNativeShadowDom = false;
let checkSlotFallbackVisibility = false;
let checkSlotRelocate = false;
let isSvgMode = false;
const parsePropertyValue = (propValue, propType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if ( propType & 4 /* Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return (propValue === 'false' ? false : propValue === '' || !!propValue);
        }
        if ( propType & 1 /* String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};
const CONTENT_REF_ID = 'r';
const ORG_LOCATION_ID = 'o';
const SLOT_NODE_ID = 's';
const TEXT_NODE_ID = 't';
const HYDRATED_CLASS = 'hydrated';
const HYDRATE_ID = 's-id';
const HYDRATE_CHILD_ID = 'c-id';
const createTime = (fnName, tagName = '') => {
    {
        return () => { return; };
    }
};
const uniqueTime = (key, measureText) => {
    {
        return () => { return; };
    }
};
const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
    let scopeId =  getScopeId(cmpMeta.$tagName$);
    let style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = (styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc);
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            let appliedStyles = rootAppliedStyles.get(styleContainerNode);
            let styleElm;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, appliedStyles = new Set());
            }
            if (!appliedStyles.has(scopeId)) {
                {
                    {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    {
                        styleElm.setAttribute(HYDRATE_ID, scopeId);
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if ( !styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [
                ...styleContainerNode.adoptedStyleSheets,
                style
            ];
        }
    }
    return scopeId;
};
const attachStyles = (elm, cmpMeta, mode) => {
    const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    const scopeId = addStyle( elm.getRootNode(), cmpMeta);
    if ( cmpMeta.$flags$ & 10 /* needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
    }
    endAttachStyles();
};
const getScopeId = (tagName, mode) => 'sc-' + ( tagName);
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
    let child = null;
    let slotName = null;
    let simple = false;
    let lastSimple = false;
    let vNodeChildren = [];
    const walk = (c) => {
        for (let i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if (simple = typeof nodeName !== 'function' && !isComplexType(child)) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if (vnodeData) {
        if ( vnodeData.name) {
            slotName = vnodeData.name;
        }
        {
            const classData = vnodeData.className || vnodeData.class;
            if (classData) {
                vnodeData.class = typeof classData !== 'object'
                    ? classData
                    : Object.keys(classData)
                        .filter(k => classData[k])
                        .join(' ');
            }
        }
    }
    if ( typeof nodeName === 'function') {
        // nodeName is a functional component
        return nodeName(vnodeData, vNodeChildren, vdomFnUtils);
    }
    const vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    {
        vnode.$name$ = slotName;
    }
    return vnode;
};
const newVNode = (tag, text) => {
    const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null
    };
    {
        vnode.$attrs$ = null;
    }
    {
        vnode.$name$ = null;
    }
    return vnode;
};
const Host = {};
const isHost = (node) => node && node.$tag$ === Host;
const vdomFnUtils = {
    'forEach': (children, cb) => children.map(convertToPublic).forEach(cb),
    'map': (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate)
};
const convertToPublic = (node) => {
    return {
        vattrs: node.$attrs$,
        vchildren: node.$children$,
        vkey: node.$key$,
        vname: node.$name$,
        vtag: node.$tag$,
        vtext: node.$text$
    };
};
const convertToPrivate = (node) => {
    const vnode = newVNode(node.vtag, node.vtext);
    vnode.$attrs$ = node.vattrs;
    vnode.$children$ = node.vchildren;
    vnode.$key$ = node.vkey;
    vnode.$name$ = node.vname;
    return vnode;
};
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
    if (oldValue === newValue) {
        return;
    }
    let isProp = isMemberInElement(elm, memberName);
    let ln = memberName.toLowerCase();
    if ( memberName === 'class') {
        const classList = elm.classList;
        const oldClasses = parseClassList(oldValue);
        const newClasses = parseClassList(newValue);
        classList.remove(...oldClasses.filter(c => c && !newClasses.includes(c)));
        classList.add(...newClasses.filter(c => c && !oldClasses.includes(c)));
    }
    else {
        // Set property if it exists and it's not a SVG
        const isComplex = isComplexType(newValue);
        if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
            try {
                if (!elm.tagName.includes('-')) {
                    let n = newValue == null ? '' : newValue;
                    // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                    if (memberName === 'list') {
                        isProp = false;
                        // tslint:disable-next-line: triple-equals
                    }
                    else if (oldValue == null || elm[memberName] != n) {
                        elm[memberName] = n;
                    }
                }
                else {
                    elm[memberName] = newValue;
                }
            }
            catch (e) { }
        }
        if (newValue == null || newValue === false) {
            {
                elm.removeAttribute(memberName);
            }
        }
        else if ((!isProp || (flags & 4 /* isHost */) || isSvg) && !isComplex) {
            newValue = newValue === true ? '' : newValue;
            {
                elm.setAttribute(memberName, newValue);
            }
        }
    }
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => (!value) ? [] : value.split(parseClassListRegex);
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = (newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host) ? newVnode.$elm$.host : newVnode.$elm$;
    const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
    // tslint:disable-next-line: prefer-const
    let newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    let oldVNode;
    if ( !useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if (newVNode.$tag$ === 'slot') {
            if (scopeId) {
                // scoped css needs to add its scoped id to the parent element
                parentElm.classList.add(scopeId + '-s');
            }
            newVNode.$flags$ |= (newVNode.$children$)
                // slot element has fallback content
                // still create an element that "mocks" the slot element
                ? 2 /* isSlotFallback */
                // slot element does not have fallback content
                // create an html comment we'll use to always reference
                // where actual slot content should sit next to
                : 1 /* isSlotReference */;
        }
    }
    if ( newVNode.$text$ !== null) {
        // create text node
        elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else if ( newVNode.$flags$ & 1 /* isSlotReference */) {
        // create a slot reference node
        elm = newVNode.$elm$ =  doc.createComment(`slot-reference:${hostTagName.toLowerCase()}`) ;
    }
    else {
        // create element
        elm = newVNode.$elm$ = ( doc.createElement(( newVNode.$flags$ & 2 /* isSlotFallback */) ? 'slot-fb' : newVNode.$tag$));
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if ( isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i, elm);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
    }
    {
        elm['s-hn'] = hostTagName;
        if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
            // remember the content reference comment
            elm['s-sr'] = true;
            // remember the content reference comment
            elm['s-cr'] = contentRef;
            // remember the slot name, or empty string for default slot
            elm['s-sn'] = newVNode.$name$ || '';
            // check if we've got an old vnode for this slot
            oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
            if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                // we've got an old slot vnode and the wrapper is being replaced
                // so let's move the old slot content back to it's original location
                putBackInOriginalLocation(oldParentVNode.$elm$, false);
            }
        }
    }
    return elm;
};
const putBackInOriginalLocation = (parentElm, recursive) => {
    plt.$flags$ |= 1 /* isTmpDisconnected */;
    const oldSlotChildNodes = parentElm.childNodes;
    for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        const childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
            // // this child node in the old element is from another component
            // // remove this node from the old slot's parent
            // childNode.remove();
            // and relocate it back to it's original location
            parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
            // remove the old original location comment entirely
            // later on the patch function will know what to do
            // and move this to the correct spot in need be
            childNode['s-ol'].remove();
            childNode['s-ol'] = undefined;
            checkSlotRelocate = true;
        }
        if (recursive) {
            putBackInOriginalLocation(childNode, recursive);
        }
    }
    plt.$flags$ &= ~1 /* isTmpDisconnected */;
};
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
    let containerElm = (( parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
    let childNode;
    if ( containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx, parentElm);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode,  referenceNode(before) );
            }
        }
    }
};
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnode = vnodes[startIdx]) {
            elm = vnode.$elm$;
            {
                // we're removing this element
                // so it's possible we need to show slot fallback content now
                checkSlotFallbackVisibility = true;
                if (elm['s-ol']) {
                    // remove the original location comment
                    elm['s-ol'].remove();
                }
                else {
                    // it's possible that child nodes of the node
                    // that's being removed are slot nodes
                    putBackInOriginalLocation(elm, true);
                }
            }
            // remove the vnode's element from the dom
            elm.remove();
        }
    }
};
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let node;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // Vnode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // Vnode moved right
            if ( (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
            }
            patch(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            if ( (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
            }
            patch(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            {
                // new element
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                {
                    parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        addVnodes(parentElm, (newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$), newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if ( newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
const isSameVnode = (vnode1, vnode2) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.$tag$ === vnode2.$tag$) {
        if ( vnode1.$tag$ === 'slot') {
            return vnode1.$name$ === vnode2.$name$;
        }
        return true;
    }
    return false;
};
const referenceNode = (node) => {
    // this node was relocated to a new location in the dom
    // because of some other component's slot
    // but we still have an html comment in place of where
    // it's original location was according to it's original vdom
    return (node && node['s-ol']) || node;
};
const parentReferenceNode = (node) => (node['s-ol'] ? node['s-ol'] : node).parentNode;
const patch = (oldVNode, newVNode) => {
    const elm = newVNode.$elm$ = oldVNode.$elm$;
    const oldChildren = oldVNode.$children$;
    const newChildren = newVNode.$children$;
    let defaultHolder;
    if ( newVNode.$text$ === null) {
        // element node
        {
            if ( newVNode.$tag$ === 'slot')
                ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if ( oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // no old child vnodes, but there are new child vnodes to add
            if ( oldVNode.$text$ !== null) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if ( oldChildren !== null) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
    }
    else if ( (defaultHolder = elm['s-cr'])) {
        // this element has slotted content
        defaultHolder.parentNode.textContent = newVNode.$text$;
    }
    else if ( oldVNode.$text$ !== newVNode.$text$) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.data = newVNode.$text$;
    }
};
const updateFallbackSlotVisibility = (elm) => {
    // tslint:disable-next-line: prefer-const
    let childNodes = elm.childNodes;
    let childNode;
    let i;
    let ilen;
    let j;
    let slotNameAttr;
    let nodeType;
    for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode.nodeType === 1 /* ElementNode */) {
            if (childNode['s-sr']) {
                // this is a slot fallback node
                // get the slot name for this slot reference node
                slotNameAttr = childNode['s-sn'];
                // by default always show a fallback slot node
                // then hide it if there are other slots in the light dom
                childNode.hidden = false;
                for (j = 0; j < ilen; j++) {
                    if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
                        // this sibling node is from a different component
                        nodeType = childNodes[j].nodeType;
                        if (slotNameAttr !== '') {
                            // this is a named fallback slot node
                            if (nodeType === 1 /* ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                        else {
                            // this is a default fallback slot node
                            // any element or text node (with content)
                            // should hide the default fallback slot node
                            if (nodeType === 1 /* ElementNode */ || (nodeType === 3 /* TextNode */ && childNodes[j].textContent.trim() !== '')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                    }
                }
            }
            // keep drilling down
            updateFallbackSlotVisibility(childNode);
        }
    }
};
const relocateNodes = [];
const relocateSlotContent = (elm) => {
    // tslint:disable-next-line: prefer-const
    let childNodes = elm.childNodes;
    let ilen = childNodes.length;
    let i = 0;
    let j = 0;
    let nodeType = 0;
    let childNode;
    let node;
    let hostContentNodes;
    let slotNameAttr;
    for (ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr'])) {
            // first got the content reference comment node
            // then we got it's parent, which is where all the host content is in now
            hostContentNodes = node.parentNode.childNodes;
            slotNameAttr = childNode['s-sn'];
            for (j = hostContentNodes.length - 1; j >= 0; j--) {
                node = hostContentNodes[j];
                if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                    // let's do some relocating to its new home
                    // but never relocate a content reference node
                    // that is suppose to always represent the original content location
                    nodeType = node.nodeType;
                    if (((nodeType === 3 /* TextNode */ || nodeType === 8 /* CommentNode */) && slotNameAttr === '') ||
                        (nodeType === 1 /* ElementNode */ && node.getAttribute('slot') === null && slotNameAttr === '') ||
                        (nodeType === 1 /* ElementNode */ && node.getAttribute('slot') === slotNameAttr)) {
                        // it's possible we've already decided to relocate this node
                        if (!relocateNodes.some(r => r.$nodeToRelocate$ === node)) {
                            // made some changes to slots
                            // let's make sure we also double check
                            // fallbacks are correctly hidden or shown
                            checkSlotFallbackVisibility = true;
                            node['s-sn'] = slotNameAttr;
                            // add to our list of nodes to relocate
                            relocateNodes.push({
                                $slotRefNode$: childNode,
                                $nodeToRelocate$: node
                            });
                        }
                    }
                }
            }
        }
        if (childNode.nodeType === 1 /* ElementNode */) {
            relocateSlotContent(childNode);
        }
    }
};
const renderVdom = (hostElm, hostRef, cmpMeta, renderFnResults) => {
    hostTagName = hostElm.tagName;
    const oldVNode = hostRef.$vnode$ || newVNode(null, null);
    const rootVnode = isHost(renderFnResults)
        ? renderFnResults
        : h(null, null, renderFnResults);
    if ( cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.forEach(([propName, attribute]) => rootVnode.$attrs$[attribute] = hostElm[propName]);
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = ( hostElm.shadowRoot || hostElm );
    {
        scopeId = hostElm['s-sc'];
    }
    {
        contentRef = hostElm['s-cr'];
        useNativeShadowDom = supportsShadowDom ;
        // always reset
        checkSlotFallbackVisibility = false;
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
    {
        if (checkSlotRelocate) {
            relocateSlotContent(rootVnode.$elm$);
            for (let i = 0; i < relocateNodes.length; i++) {
                const relocateNode = relocateNodes[i];
                if (!relocateNode.$nodeToRelocate$['s-ol']) {
                    // add a reference node marking this node's original location
                    // keep a reference to this node for later lookups
                    const orgLocationNode =  doc.createComment(`org-loc`)
                        ;
                    orgLocationNode['s-nr'] = relocateNode.$nodeToRelocate$;
                    relocateNode.$nodeToRelocate$.parentNode.insertBefore((relocateNode.$nodeToRelocate$['s-ol'] = orgLocationNode), relocateNode.$nodeToRelocate$);
                }
            }
            // while we're moving nodes around existing nodes, temporarily disable
            // the disconnectCallback from working
            plt.$flags$ |= 1 /* isTmpDisconnected */;
            for (let i = 0; i < relocateNodes.length; i++) {
                const relocateNode = relocateNodes[i];
                // by default we're just going to insert it directly
                // after the slot reference node
                const parentNodeRef = relocateNode.$slotRefNode$.parentNode;
                let insertBeforeNode = relocateNode.$slotRefNode$.nextSibling;
                let orgLocationNode = relocateNode.$nodeToRelocate$['s-ol'];
                while (orgLocationNode = orgLocationNode.previousSibling) {
                    let refNode = orgLocationNode['s-nr'];
                    if (refNode &&
                        refNode['s-sn'] === relocateNode.$nodeToRelocate$['s-sn'] &&
                        parentNodeRef === refNode.parentNode) {
                        refNode = refNode.nextSibling;
                        if (!refNode || !refNode['s-nr']) {
                            insertBeforeNode = refNode;
                            break;
                        }
                    }
                }
                if ((!insertBeforeNode && parentNodeRef !== relocateNode.$nodeToRelocate$.parentNode) ||
                    (relocateNode.$nodeToRelocate$.nextSibling !== insertBeforeNode)) {
                    // we've checked that it's worth while to relocate
                    // since that the node to relocate
                    // has a different next sibling or parent relocated
                    if (relocateNode.$nodeToRelocate$ !== insertBeforeNode) {
                        // add it back to the dom but in its new home
                        parentNodeRef.insertBefore(relocateNode.$nodeToRelocate$, insertBeforeNode);
                    }
                }
            }
            // done moving nodes around
            // allow the disconnect callback to work again
            plt.$flags$ &= ~1 /* isTmpDisconnected */;
        }
        if (checkSlotFallbackVisibility) {
            updateFallbackSlotVisibility(rootVnode.$elm$);
        }
        // always reset
        relocateNodes.length = 0;
    }
};
const attachToAncestor = (hostRef, ancestorComponent) => {
    if ( ancestorComponent && !hostRef.$onRenderResolve$) {
        ancestorComponent['s-p'].push(new Promise(r => hostRef.$onRenderResolve$ = r));
    }
};
const scheduleUpdate = (elm, hostRef, cmpMeta, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
    }
    if ( hostRef.$flags$ & 4 /* isWaitingForChildren */) {
        hostRef.$flags$ |= 512 /* needsRerender */;
        return;
    }
    const endSchedule = createTime('scheduleUpdate', cmpMeta.$tagName$);
    const ancestorComponent = hostRef.$ancestorComponent$;
    const instance =  hostRef.$lazyInstance$ ;
    const update = () => updateComponent(elm, hostRef, cmpMeta, instance, isInitialLoad);
    attachToAncestor(hostRef, ancestorComponent);
    let promise;
    if (isInitialLoad) {
        {
            promise = safeCall(instance, 'componentWillLoad');
        }
    }
    endSchedule();
    // there is no ancestorc omponent or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    return then(promise,  () => writeTask(update)
        );
};
const updateComponent = (elm, hostRef, cmpMeta, instance, isInitialLoad) => {
    // updateComponent
    const endUpdate = createTime('update', cmpMeta.$tagName$);
    const rc = elm['s-rc'];
    if ( isInitialLoad) {
        // DOM WRITE!
        attachStyles(elm, cmpMeta);
    }
    const endRender = createTime('render', cmpMeta.$tagName$);
    {
        {
            try {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                renderVdom(elm, hostRef, cmpMeta,  instance.render() );
            }
            catch (e) {
                consoleError(e);
            }
        }
    }
    {
        hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
    }
    {
        try {
            // manually connected child components during server-side hydrate
            serverSideConnected(elm);
            if (isInitialLoad && (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */)) {
                // using only during server-side hydrate
                elm['s-sd'] = true;
            }
        }
        catch (e) {
            consoleError(e);
        }
    }
    {
        hostRef.$flags$ |= 2 /* hasRendered */;
    }
    if ( rc) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        rc.forEach(cb => cb());
        elm['s-rc'] = undefined;
    }
    endRender();
    endUpdate();
    {
        const childrenPromises = elm['s-p'];
        const postUpdate = () => postUpdateComponent(elm, hostRef, cmpMeta);
        if (childrenPromises.length === 0) {
            postUpdate();
        }
        else {
            Promise.all(childrenPromises).then(postUpdate);
            hostRef.$flags$ |= 4 /* isWaitingForChildren */;
            childrenPromises.length = 0;
        }
    }
};
const postUpdateComponent = (elm, hostRef, cmpMeta) => {
    const endPostUpdate = createTime('postUpdate', cmpMeta.$tagName$);
    const ancestorComponent = hostRef.$ancestorComponent$;
    if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
        hostRef.$flags$ |= 64 /* hasLoadedComponent */;
        {
            // DOM WRITE!
            // add the css class that this element has officially hydrated
            elm.classList.add(HYDRATED_CLASS);
        }
        endPostUpdate();
        {
            hostRef.$onReadyResolve$(elm);
            if (!ancestorComponent) {
                appDidLoad();
            }
        }
    }
    else {
        endPostUpdate();
    }
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    {
        if (hostRef.$onRenderResolve$) {
            hostRef.$onRenderResolve$();
            hostRef.$onRenderResolve$ = undefined;
        }
        if (hostRef.$flags$ & 512 /* needsRerender */) {
            nextTick(() => scheduleUpdate(elm, hostRef, cmpMeta, false));
        }
        hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
const appDidLoad = (who) => {
    // on appload
    // we have finish the first big initial render
    {
        doc.documentElement.classList.add(HYDRATED_CLASS);
    }
};
const safeCall = (instance, method, arg) => {
    if (instance && instance[method]) {
        try {
            return instance[method](arg);
        }
        catch (e) {
            consoleError(e);
        }
    }
    return undefined;
};
const then = (promise, thenFn) => {
    return promise && promise.then ? promise.then(thenFn) : thenFn();
};
const serverSideConnected = (elm) => {
    const children = elm.children;
    if (children != null) {
        for (let i = 0, ii = children.length; i < ii; i++) {
            const childElm = children[i];
            if (typeof childElm.connectedCallback === 'function') {
                childElm.connectedCallback();
            }
            serverSideConnected(childElm);
        }
    }
};
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm =  hostRef.$hostElement$ ;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    const instance =  hostRef.$lazyInstance$ ;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    if (newVal !== oldVal && ( !(flags & 8 /* isConstructingInstance */) || oldVal === undefined)) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if ( instance) {
            // get an array of method names of watch functions to call
            if ( cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.forEach(watchMethodName => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            instance[watchMethodName](newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e);
                        }
                    });
                }
            }
            if ( (flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(elm, hostRef, cmpMeta, false);
            }
        }
    }
};
const proxyComponent = (Cstr, cmpMeta, flags) => {
    if ( cmpMeta.$members$) {
        if ( Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.forEach(([memberName, [memberFlags]]) => {
            if ( ((memberFlags & 31 /* Prop */) ||
                (( flags & 2 /* proxyState */) &&
                    (memberFlags & 32 /* State */)))) {
                // proxyComponent - prop
                Object.defineProperty(prototype, memberName, {
                    get() {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        });
        if ( ( flags & 1 /* isElementConstructor */)) {
            const attrNameToPropName = new Map();
            prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                plt.jmp(() => {
                    const propName = attrNameToPropName.get(attrName);
                    this[propName] = newValue === null && typeof this[propName] === 'boolean'
                        ? false
                        : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if ( m[0] & 512 /* ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ( (hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
        // we haven't initialized this element yet
        hostRef.$flags$ |= 32 /* hasInitializedComponent */;
        if ( hostRef.$modeName$) {
            elm.setAttribute('s-mode', hostRef.$modeName$);
        }
        {
            // lazy loaded components
            // request the component's implementation to be
            // wired up with the host element
            Cstr = loadModule(cmpMeta);
            if (Cstr.then) {
                // Await creates a micro-task avoid if possible
                const endLoad = uniqueTime();
                Cstr = await Cstr;
                endLoad();
            }
            if ( !Cstr.isProxied) {
                // we'eve never proxied this Constructor before
                // let's add the getters/setters to its prototype before
                // the first time we create an instance of the implementation
                {
                    cmpMeta.$watchers$ = Cstr.watchers;
                }
                proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
                Cstr.isProxied = true;
            }
            const endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
            // ok, time to construct the instance
            // but let's keep track of when we start and stop
            // so that the getters/setters don't incorrectly step on data
            {
                hostRef.$flags$ |= 8 /* isConstructingInstance */;
            }
            // construct the lazy-loaded component implementation
            // passing the hostRef is very important during
            // construction in order to directly wire together the
            // host element and the lazy-loaded instance
            try {
                new Cstr(hostRef);
            }
            catch (e) {
                consoleError(e);
            }
            {
                hostRef.$flags$ &= ~8 /* isConstructingInstance */;
            }
            {
                hostRef.$flags$ |= 128 /* isWatchReady */;
            }
            endNewInstance();
        }
        const scopeId =  getScopeId(cmpMeta.$tagName$);
        if ( !styles.has(scopeId) && Cstr.style) {
            const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            registerStyle(scopeId, style);
            endRegisterStyles();
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(elm, hostRef, cmpMeta, true);
    if ( ancestorComponent && ancestorComponent['s-rc']) {
        // this is the intial load and this component it has an ancestor component
        // but the ancestor component has NOT fired its will update lifecycle yet
        // so let's just cool our jets and wait for the ancestor to continue first
        // this will get fired off when the ancestor component
        // finally gets around to rendering its lazy self
        // fire off the initial update
        ancestorComponent['s-rc'].push(schedule);
    }
    else {
        schedule();
    }
};
const connectedCallback = (elm, cmpMeta) => {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
        // connectedCallback
        const hostRef = getHostRef(elm);
        if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* hasConnected */;
            let hostId;
            if ( !hostId) {
                // initUpdate
                // if the slot polyfill is required we'll need to put some nodes
                // in here to act as original content anchors as we move nodes around
                // host element has been connected to the DOM
                {
                    setContentReference(elm);
                }
            }
            {
                // find the first ancestor component (if there is one) and register
                // this component as one of the actively loading child components for its ancestor
                let ancestorComponent = elm;
                while ((ancestorComponent = (ancestorComponent.parentNode || ancestorComponent.host))) {
                    // climb up the ancestors looking for the first
                    // component that hasn't finished its lifecycle update yet
                    if (
                        (ancestorComponent['s-p'])) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent));
                        break;
                    }
                }
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
            }
        }
        endConnected();
    }
};
const setContentReference = (elm) => {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    const crName =  '';
    const contentRefElm = elm['s-cr'] = doc.createComment(crName);
    contentRefElm['s-cn'] = true;
    elm.insertBefore(contentRefElm, elm.firstChild);
};
const insertVdomAnnotations = (doc) => {
    if (doc != null) {
        const docData = {
            hostIds: 0,
            rootLevelIds: 0
        };
        const orgLocationNodes = [];
        parseVNodeAnnotations(doc, doc.body, docData, orgLocationNodes);
        orgLocationNodes.forEach(orgLocationNode => {
            if (orgLocationNode != null) {
                const nodeRef = orgLocationNode['s-nr'];
                let hostId = nodeRef['s-host-id'];
                let nodeId = nodeRef['s-node-id'];
                let childId = `${hostId}.${nodeId}`;
                if (hostId == null) {
                    hostId = 0;
                    docData.rootLevelIds++;
                    nodeId = docData.rootLevelIds;
                    childId = `${hostId}.${nodeId}`;
                    if (nodeRef.nodeType === 1 /* ElementNode */) {
                        nodeRef.setAttribute(HYDRATE_CHILD_ID, childId);
                    }
                    else if (nodeRef.nodeType === 3 /* TextNode */) {
                        if (hostId === 0) {
                            const textContent = nodeRef.nodeValue.trim();
                            if (textContent === '') {
                                // useless whitespace node at the document root
                                orgLocationNode.remove();
                                return;
                            }
                        }
                        const commentBeforeTextNode = doc.createComment(childId);
                        commentBeforeTextNode.nodeValue = `${TEXT_NODE_ID}.${childId}`;
                        nodeRef.parentNode.insertBefore(commentBeforeTextNode, nodeRef);
                    }
                }
                let orgLocationNodeId = `${ORG_LOCATION_ID}.${childId}`;
                const orgLocationParentNode = orgLocationNode.parentElement;
                if (orgLocationParentNode && orgLocationParentNode['s-sd']) {
                    // ending with a . means that the parent element
                    // of this node's original location is a shadow dom element
                    // and this node is apart of the root level light dom
                    orgLocationNodeId += `.`;
                }
                orgLocationNode.nodeValue = orgLocationNodeId;
            }
        });
    }
};
const parseVNodeAnnotations = (doc, node, docData, orgLocationNodes) => {
    if (node == null) {
        return;
    }
    if (node['s-nr'] != null) {
        orgLocationNodes.push(node);
    }
    if (node.nodeType === 1 /* ElementNode */) {
        node.childNodes.forEach(childNode => {
            const hostRef = getHostRef(childNode);
            if (hostRef != null) {
                const cmpData = {
                    nodeIds: 0
                };
                insertVNodeAnnotations(doc, childNode, hostRef.$vnode$, docData, cmpData);
            }
            parseVNodeAnnotations(doc, childNode, docData, orgLocationNodes);
        });
    }
};
const insertVNodeAnnotations = (doc, hostElm, vnode, docData, cmpData) => {
    if (vnode != null) {
        const hostId = ++docData.hostIds;
        hostElm.setAttribute(HYDRATE_ID, hostId);
        if (hostElm['s-cr'] != null) {
            hostElm['s-cr'].nodeValue = `${CONTENT_REF_ID}.${hostId}`;
        }
        if (vnode.$children$ != null) {
            const depth = 0;
            vnode.$children$.forEach((vnodeChild, index) => {
                insertChildVNodeAnnotations(doc, vnodeChild, cmpData, hostId, depth, index);
            });
        }
    }
};
const insertChildVNodeAnnotations = (doc, vnodeChild, cmpData, hostId, depth, index) => {
    const childElm = vnodeChild.$elm$;
    if (childElm == null) {
        return;
    }
    const nodeId = cmpData.nodeIds++;
    const childId = `${hostId}.${nodeId}.${depth}.${index}`;
    childElm['s-host-id'] = hostId;
    childElm['s-node-id'] = nodeId;
    if (childElm.nodeType === 1 /* ElementNode */) {
        childElm.setAttribute(HYDRATE_CHILD_ID, childId);
    }
    else if (childElm.nodeType === 3 /* TextNode */) {
        const parentNode = childElm.parentNode;
        if (parentNode.nodeName !== 'STYLE') {
            const textNodeId = `${TEXT_NODE_ID}.${childId}`;
            const commentBeforeTextNode = doc.createComment(textNodeId);
            parentNode.insertBefore(commentBeforeTextNode, childElm);
        }
    }
    else if (childElm.nodeType === 8 /* CommentNode */) {
        if (childElm['s-sr']) {
            const slotName = (childElm['s-sn'] || '');
            const slotNodeId = `${SLOT_NODE_ID}.${childId}.${slotName}`;
            childElm.nodeValue = slotNodeId;
        }
    }
    if (vnodeChild.$children$ != null) {
        const childDepth = depth + 1;
        vnodeChild.$children$.forEach((vnode, index) => {
            insertChildVNodeAnnotations(doc, vnode, cmpData, hostId, childDepth, index);
        });
    }
};

function proxyHostElement(elm, cmpMeta) {
    if (typeof elm.componentOnReady !== 'function') {
        elm.componentOnReady = componentOnReady;
    }
    if (typeof elm.forceUpdate !== 'function') {
        elm.forceUpdate = forceUpdate;
    }
    if (cmpMeta.$members$ != null) {
        const hostRef = getHostRef(elm);
        const members = Object.entries(cmpMeta.$members$);
        members.forEach(([memberName, m]) => {
            const memberFlags = m[0];
            if (memberFlags & 31) {
                const attributeName = (m[1] || memberName);
                const attrValue = elm.getAttribute(attributeName);
                if (attrValue != null) {
                    const parsedAttrValue = parsePropertyValue(attrValue, memberFlags);
                    hostRef.$instanceValues$.set(memberName, parsedAttrValue);
                }
                const ownValue = elm[memberName];
                if (ownValue !== undefined) {
                    hostRef.$instanceValues$.set(memberName, ownValue);
                    delete elm[memberName];
                }
                Object.defineProperty(elm, memberName, {
                    get() {
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true
                });
            }
            else if (memberFlags & 64) {
                Object.defineProperty(elm, memberName, {
                    value() {
                        const ref = getHostRef(this);
                        const args = arguments;
                        return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName].apply(ref.$lazyInstance$, args)).catch(consoleError);
                    }
                });
            }
        });
    }
}
function componentOnReady() {
    return getHostRef(this).$onReadyPromise$;
}
function forceUpdate() { }

function bootstrapHydrate(win, opts, done) {
    const results = {
        hydratedCount: 0,
        hydratedComponents: []
    };
    plt.$resourcesUrl$ = new URL(opts.resourcesUrl || './', doc.baseURI).href;
    try {
        const connectedElements = new Set();
        const createdElements = new Set();
        const patchedConnectedCallback = function patchedConnectedCallback() {
            return connectElement(this);
        };
        const patchElement = function (elm) {
            const tagName = elm.nodeName.toLowerCase();
            if (elm.tagName.includes('-')) {
                const Cstr = getComponent(tagName);
                if (Cstr != null && Cstr.cmpMeta) {
                    createdElements.add(elm);
                    elm.connectedCallback = patchedConnectedCallback;
                    registerHost(elm);
                    proxyHostElement(elm, Cstr.cmpMeta);
                }
            }
        };
        const orgDocumentCreateElement = win.document.createElement;
        win.document.createElement = function patchedCreateElement(tagName) {
            const elm = orgDocumentCreateElement.call(win.document, tagName);
            patchElement(elm);
            return elm;
        };
        const orgDocumentCreateElementNS = win.document.createElementNS;
        win.document.createElementNS = function patchedCreateElement(namespaceURI, tagName) {
            const elm = orgDocumentCreateElementNS.call(win.document, namespaceURI, tagName);
            patchElement(elm);
            return elm;
        };
        const patchChild = (elm) => {
            if (elm != null && elm.nodeType === 1) {
                patchElement(elm);
                const children = elm.children;
                for (let i = 0, ii = children.length; i < ii; i++) {
                    patchChild(children[i]);
                }
            }
        };
        const connectElement = (elm) => {
            createdElements.delete(elm);
            if (elm != null && elm.nodeType === 1 && results.hydratedCount < opts.maxHydrateCount && shouldHydrate(elm)) {
                const tagName = elm.nodeName.toLowerCase();
                if (tagName.includes('-') && !connectedElements.has(elm)) {
                    connectedElements.add(elm);
                    return hydrateComponent(win, results, tagName, elm);
                }
            }
            return Promise.resolve();
        };
        const flush = () => {
            const toConnect = Array.from(createdElements).filter(elm => elm.parentElement);
            if (toConnect.length > 0) {
                return Promise.all(toConnect.map(elm => connectElement(elm)));
            }
            return undefined;
        };
        patchChild(win.document.body);
        const waitLoop = () => {
            const waitForComponents = flush();
            if (waitForComponents === undefined) {
                return Promise.resolve();
            }
            return waitForComponents.then(() => waitLoop());
        };
        waitLoop()
            .then(() => {
            try {
                createdElements.clear();
                connectedElements.clear();
                if (opts.clientHydrateAnnotations) {
                    insertVdomAnnotations(win.document);
                }
                win.document.createElement = orgDocumentCreateElement;
                win.document.createElementNS = orgDocumentCreateElementNS;
            }
            catch (e) {
                win.console.error(e);
            }
            done(results);
        })
            .catch(e => {
            try {
                win.console.error(e);
                connectedElements.clear();
                win.document.createElement = orgDocumentCreateElement;
                win.document.createElementNS = orgDocumentCreateElementNS;
            }
            catch (e) { }
            done(results);
        });
    }
    catch (e) {
        win.console.error(e);
        win = opts = null;
        done(results);
    }
}
async function hydrateComponent(win, results, tagName, elm) {
    const Cstr = getComponent(tagName);
    if (Cstr != null) {
        const cmpMeta = Cstr.cmpMeta;
        if (cmpMeta != null) {
            try {
                connectedCallback(elm, cmpMeta);
                await elm.componentOnReady();
                results.hydratedCount++;
                const ref = getHostRef(elm);
                const modeName = !ref.$modeName$ ? '$' : ref.$modeName$;
                if (!results.hydratedComponents.some(c => c.tag === tagName && c.mode === modeName)) {
                    results.hydratedComponents.push({
                        tag: tagName,
                        mode: modeName
                    });
                }
            }
            catch (e) {
                win.console.error(e);
            }
        }
    }
}
function shouldHydrate(elm) {
    if (elm.nodeType === 9) {
        return true;
    }
    if (NO_HYDRATE_TAGS.has(elm.nodeName)) {
        return false;
    }
    if (elm.hasAttribute('no-prerender')) {
        return false;
    }
    const parentNode = elm.parentNode;
    if (parentNode == null) {
        return true;
    }
    return shouldHydrate(parentNode);
}
const NO_HYDRATE_TAGS = new Set([
    'CODE',
    'HEAD',
    'IFRAME',
    'INPUT',
    'OBJECT',
    'OUTPUT',
    'NOSCRIPT',
    'PRE',
    'SCRIPT',
    'SELECT',
    'STYLE',
    'TEMPLATE',
    'TEXTAREA'
]);

const cstrs = new Map();
const loadModule = (cmpMeta, _hostRef, _hmrVersionId) => {
    return cstrs.get(cmpMeta.$tagName$);
};
const getComponent = (tagName) => {
    return cstrs.get(tagName);
};
const isMemberInElement = (elm, memberName) => {
    if (elm != null) {
        if (memberName in elm) {
            return true;
        }
        const nodeName = elm.nodeName;
        if (nodeName) {
            const hostRef = getComponent(nodeName.toLowerCase());
            if (hostRef != null && hostRef.cmpMeta != null && hostRef.cmpMeta.$members$ != null) {
                return memberName in hostRef.cmpMeta.$members$;
            }
        }
    }
    return false;
};
const registerComponents = (Cstrs) => {
    Cstrs.forEach(Cstr => {
        cstrs.set(Cstr.cmpMeta.$tagName$, Cstr);
    });
};
const win = window;
const doc = win.document;
const writeTask = (cb) => {
    process.nextTick(() => {
        try {
            cb();
        }
        catch (e) {
            consoleError(e);
        }
    });
};
const nextTick = (cb) => Promise.resolve().then(cb);
const consoleError = (e) => {
    if (e != null) {
        console.error(e.stack || e.message || e);
    }
};
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: (h) => h(),
    raf: (h) => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
};
const supportsShadowDom = false;
const hostRefs = new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerInstance = (lazyInstance, hostRef) => hostRefs.set(hostRef.$lazyInstance$ = lazyInstance, hostRef);
const registerHost = (elm) => {
    const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $instanceValues$: new Map(),
        $renderCount$: 0
    };
    hostRef.$onInstancePromise$ = new Promise(r => hostRef.$onInstanceResolve$ = r);
    hostRef.$onReadyPromise$ = new Promise(r => hostRef.$onReadyResolve$ = r);
    elm['s-p'] = [];
    elm['s-rc'] = [];
    return hostRefs.set(elm, hostRef);
};
const styles = new Map();

class Button {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("button", { type: "button", class: "es-button primary" }, this.label));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "upc-button",
        "$members$": {
            "label": [1]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class Checkbox {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the checkbox is selected.
         */
        this.checked = false;
    }
    render() {
        return (h("label", { class: "es-check" }, h("input", { type: "checkbox", class: "es-check-input", checked: this.checked }), this.label));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "upc-checkbox",
        "$members$": {
            "checked": [1028],
            "label": [1]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

var crypto = {};

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.



var rng = function nodeRNG() {
  return crypto.randomBytes(16);
};

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

var bytesToUuid_1 = bytesToUuid;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

var Type;
(function (Type) {
    Type["TEXT"] = "text";
    Type["CHECKBOX"] = "checkbox";
    Type["RADIO"] = "radio";
    Type["SELECT"] = "select";
})(Type || (Type = {}));

class Form {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("form", { novalidate: true }, this.settings.elements.map((element) => {
            let node = null;
            switch (element.type) {
                case Type.TEXT:
                    node = h("upc-text", { label: element.label, id: v4_1(), name: element.label });
                    break;
                case Type.CHECKBOX:
                    node = h("upc-checkbox", { label: element.label, id: v4_1() });
                    break;
                case Type.RADIO:
                    const name = 'test';
                    node = (h("fieldset", null, h("legend", null, element.label), element.options.map(option => h("p", null, h("upc-radio", { name: name, label: option.label, id: v4_1() })))));
                    break;
            }
            return (h("div", { class: "element" }, node));
        }), h("div", { class: "element" }, h("upc-button", { label: "Save" }))));
    }
    static get cmpMeta() { return {
        "$flags$": 0,
        "$tagName$": "upc-form",
        "$members$": {
            "settings": [16]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

const get = (id, base = '/settings') => {
    const endpoint = `${base}/${id}`;
    return fetch(endpoint);
};
var api = {
    get
};

var Theme;
(function (Theme) {
    Theme["DEFAULT"] = "default";
    Theme["SECONDARY"] = "secondary";
})(Theme || (Theme = {}));

class PrivacySettings {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.baseApi = '/';
    }
    idChanged() { this.fetchSettings(); }
    fetchSettings() {
        if (!this.productId)
            return;
        api.get(this.productId, this.baseApi)
            .then(res => res.json())
            .then(settings => {
            this.settings = settings;
        });
    }
    componentWillLoad() {
        this.fetchSettings();
    }
    render() {
        if (!this.settings) {
            return h("span", null, "Loading settings...");
        }
        else {
            let ThemeProvider = 'div';
            switch (this.settings.theme) {
                case Theme.SECONDARY:
                    ThemeProvider = 'upc-theme-secondary';
                    break;
                default:
                    ThemeProvider = 'upc-theme-primary';
            }
            return (h(ThemeProvider, null, h("section", { class: "privacy-settings" }, h("h2", null, this.settings.label), h("upc-form", { settings: this.settings }))));
        }
    }
    static get watchers() { return {
        "productId": ["idChanged"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 0,
        "$tagName$": "upc-privacy-settings",
        "$members$": {
            "settings": [16],
            "productId": [1, "product-id"],
            "baseApi": [1, "base-api"]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class Radio {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the checkbox is selected.
         */
        this.checked = false;
    }
    render() {
        return (h("label", { class: "es-check" }, h("input", { type: "radio", class: "es-check-input", name: this.name, checked: this.checked }), this.label));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "upc-radio",
        "$members$": {
            "checked": [1540],
            "label": [1],
            "name": [1]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class Text {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("label", { class: "es-input-text" }, h("input", { type: "text", name: this.name, value: this.value }), h("span", null, this.label)));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "upc-text",
        "$members$": {
            "label": [1],
            "name": [1],
            "value": [1537]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class ThemePrimary {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", null, h("slot", null)));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "upc-theme-primary",
        "$members$": undefined,
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class ThemeSecondary {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", null, h("slot", null)));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "upc-theme-secondary",
        "$members$": undefined,
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

const cmps = [
  Button,
  Checkbox,
  Form,
  PrivacySettings,
  Radio,
  Text,
  ThemePrimary,
  ThemeSecondary,
];
registerComponents(cmps);
styles.set('sc-upc-button','/*!\@.es-button*/.es-button.sc-upc-button{-webkit-appearance:none;background-color:var(--es-color-background);border:2px solid transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;font:inherit;height:2em;line-height:1;margin:0;padding:0 calc(.8em - 2px);-webkit-transition:background-color var(--es-animation-hover),border-color var(--es-animation-hover),color var(--es-animation-hover);transition:background-color var(--es-animation-hover),border-color var(--es-animation-hover),color var(--es-animation-hover);cursor:pointer}/*!\@a.es-button*/a.es-button.sc-upc-button{display:inline-block}/*!\@.es-button.small*/.es-button.small.sc-upc-button{font-size:var(--es-font-size-16)}/*!\@.es-button.medium*/.es-button.medium.sc-upc-button{font-size:var(--es-font-size-20)}/*!\@.es-button.large*/.es-button.large.sc-upc-button{font-size:var(--es-font-size-24)}/*!\@.es-button>span*/.es-button.sc-upc-button > span.sc-upc-button{display:inline-block;padding:calc(.45em - 2px) 0 calc(.55em - 2px);vertical-align:middle}/*!\@.es-button>svg*/.es-button.sc-upc-button > svg.sc-upc-button{-webkit-box-sizing:border-box;box-sizing:border-box;fill:currentColor;height:calc(2em - 4px);padding:calc(.5em - 4px);vertical-align:middle;width:calc(2em - 4px);-webkit-transition:fill var(--es-animation-hover);transition:fill var(--es-animation-hover)}/*!\@.es-button>svg:first-child*/.es-button.sc-upc-button > svg.sc-upc-button:first-child{margin:0 0 0 calc(-.8em + 2px)}/*!\@.es-button>svg:last-child*/.es-button.sc-upc-button > svg.sc-upc-button:last-child{margin:0 calc(-.8em + 2px) 0 0}/*!\@.es-button>svg:first-child:last-child*/.es-button.sc-upc-button > svg.sc-upc-button:first-child:last-child{margin:0 calc(-.8em + 2px)}/*!\@.es-button.primary*/.es-button.primary.sc-upc-button{background-color:var(--es-color-theme1);color:var(--es-color-background)}/*!\@.es-button.primary,.es-button.secondary*/.es-button.primary.sc-upc-button, .es-button.secondary.sc-upc-button{border-color:var(--es-color-theme1)}/*!\@.es-button.tertiary*/.es-button.tertiary.sc-upc-button{border-color:var(--es-color-grey6)}/*!\@.es-button.quatarnary*/.es-button.quatarnary.sc-upc-button{border-color:transparent}/*!\@.es-button:active,.es-button:focus,.es-button:hover*/.es-button.sc-upc-button:active, .es-button.sc-upc-button:focus, .es-button.sc-upc-button:hover{background-color:var(--es-color-background);border-color:var(--es-color-theme2);color:var(--es-color-foreground)}/*!\@.es-button[aria-pressed=true]*/.es-button[aria-pressed=true].sc-upc-button{background-color:var(--es-color-theme1);border-color:var(--es-color-theme1);color:var(--es-color-background)}/*!\@.es-button[aria-pressed=true]>svg*/.es-button[aria-pressed=true].sc-upc-button > svg.sc-upc-button{fill:currentColor}/*!\@.es-button.background*/.es-button.background.sc-upc-button{background:none;border-color:currentColor;color:currentColor}/*!\@.es-button.background:focus,.es-button.background:hover,.es-button.background[aria-pressed=true]>svg*/.es-button.background.sc-upc-button:focus, .es-button.background.sc-upc-button:hover, .es-button.background[aria-pressed=true].sc-upc-button > svg.sc-upc-button{background-color:var(--es-color-background);border-color:var(--es-color-background);color:var(--es-color-grey8)}/*!\@.es-button[disabled],.es-button[disabled]:focus,.es-button[disabled]:hover*/.es-button[disabled].sc-upc-button, .es-button[disabled].sc-upc-button:focus, .es-button[disabled].sc-upc-button:hover{background-color:transparent;border-color:var(--es-color-disabled);color:var(--es-color-disabled)}/*!\@.es-button[disabled]>svg*/.es-button[disabled].sc-upc-button > svg.sc-upc-button{fill:var(--es-color-disabled)}/*!\@.es-button.primary[disabled],.es-button.primary[disabled]:focus,.es-button.primary[disabled]:hover*/.es-button.primary[disabled].sc-upc-button, .es-button.primary[disabled].sc-upc-button:focus, .es-button.primary[disabled].sc-upc-button:hover{background-color:var(--es-color-disabled);color:var(--es-color-background)}/*!\@.es-button.primary[disabled]>svg*/.es-button.primary[disabled].sc-upc-button > svg.sc-upc-button{fill:var(--es-color-background)}');
styles.set('sc-upc-checkbox','/*!\@.es-check-input.small,.es-check.small*/.es-check-input.small.sc-upc-checkbox, .es-check.small.sc-upc-checkbox{font-size:var(--es-font-size-16)}/*!\@.es-check-input.medium,.es-check.medium*/.es-check-input.medium.sc-upc-checkbox, .es-check.medium.sc-upc-checkbox{font-size:var(--es-font-size-20)}/*!\@.es-check-input.large,.es-check.large*/.es-check-input.large.sc-upc-checkbox, .es-check.large.sc-upc-checkbox{font-size:var(--es-font-size-24)}/*!\@.es-check-input*/.es-check-input.sc-upc-checkbox{-webkit-appearance:none;background-color:var(--es-color-background);border:2px solid var(--es-color-border);-webkit-box-shadow:0 0 0 .15em var(--es-color-background) inset;box-shadow:0 0 0 .15em var(--es-color-background) inset;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;font:inherit;height:calc(1em + 4px);margin:0;padding:0;position:relative;vertical-align:middle;width:calc(1em + 4px);-webkit-transition:background-color var(--es-animation-hover),border-color var(--es-animation-hover);transition:background-color var(--es-animation-hover),border-color var(--es-animation-hover)}/*!\@.es-check-input[type=radio]*/.es-check-input[type=radio].sc-upc-checkbox{border-radius:50%}/*!\@.es-check-input:focus,.es-check-input:hover*/.es-check-input.sc-upc-checkbox:focus, .es-check-input.sc-upc-checkbox:hover{border-color:var(--es-color-foreground)}/*!\@.es-check-input:checked,.es-check-input[type=checkbox]:indeterminate*/.es-check-input.sc-upc-checkbox:checked, .es-check-input[type=checkbox].sc-upc-checkbox:indeterminate{background-color:var(--es-color-theme2)}/*!\@.es-check-input[type=checkbox]:indeterminate:before*/.es-check-input[type=checkbox].sc-upc-checkbox:indeterminate:before{border-color:#fff transparent transparent #fff;border-style:solid;border-width:.5em;content:\"\";display:block}/*!\@label>.es-check-input*/label.sc-upc-checkbox > .es-check-input.sc-upc-checkbox{margin-right:.5em}/*!\@.es-check-input+label*/.es-check-input.sc-upc-checkbox + label.sc-upc-checkbox{margin-left:.5em;vertical-align:middle}/*!\@.es-check>span*/.es-check.sc-upc-checkbox > span.sc-upc-checkbox{vertical-align:middle}/*!\@.es-check-input[disabled]*/.es-check-input[disabled].sc-upc-checkbox{border:2px solid var(--es-color-disabled)!important;background-color:var(--es-color-background)!important}/*!\@.es-check-input[disabled]:checked,.es-check-input[disabled][type=checkbox]:indeterminate*/.es-check-input[disabled].sc-upc-checkbox:checked, .es-check-input[disabled][type=checkbox].sc-upc-checkbox:indeterminate{background-color:var(--es-color-disabled)!important}');
styles.set('sc-upc-form','.element{padding:.5em 0}');
styles.set('sc-upc-privacy-settings','');
styles.set('sc-upc-radio','/*!\@.es-check-input.small,.es-check.small*/.es-check-input.small.sc-upc-radio, .es-check.small.sc-upc-radio{font-size:var(--es-font-size-16)}/*!\@.es-check-input.medium,.es-check.medium*/.es-check-input.medium.sc-upc-radio, .es-check.medium.sc-upc-radio{font-size:var(--es-font-size-20)}/*!\@.es-check-input.large,.es-check.large*/.es-check-input.large.sc-upc-radio, .es-check.large.sc-upc-radio{font-size:var(--es-font-size-24)}/*!\@.es-check-input*/.es-check-input.sc-upc-radio{-webkit-appearance:none;background-color:var(--es-color-background);border:2px solid var(--es-color-border);-webkit-box-shadow:0 0 0 .15em var(--es-color-background) inset;box-shadow:0 0 0 .15em var(--es-color-background) inset;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;font:inherit;height:calc(1em + 4px);margin:0;padding:0;position:relative;vertical-align:middle;width:calc(1em + 4px);-webkit-transition:background-color var(--es-animation-hover),border-color var(--es-animation-hover);transition:background-color var(--es-animation-hover),border-color var(--es-animation-hover)}/*!\@.es-check-input[type=radio]*/.es-check-input[type=radio].sc-upc-radio{border-radius:50%}/*!\@.es-check-input:focus,.es-check-input:hover*/.es-check-input.sc-upc-radio:focus, .es-check-input.sc-upc-radio:hover{border-color:var(--es-color-foreground)}/*!\@.es-check-input:checked,.es-check-input[type=checkbox]:indeterminate*/.es-check-input.sc-upc-radio:checked, .es-check-input[type=checkbox].sc-upc-radio:indeterminate{background-color:var(--es-color-theme2)}/*!\@.es-check-input[type=checkbox]:indeterminate:before*/.es-check-input[type=checkbox].sc-upc-radio:indeterminate:before{border-color:#fff transparent transparent #fff;border-style:solid;border-width:.5em;content:\"\";display:block}/*!\@label>.es-check-input*/label.sc-upc-radio > .es-check-input.sc-upc-radio{margin-right:.5em}/*!\@.es-check-input+label*/.es-check-input.sc-upc-radio + label.sc-upc-radio{margin-left:.5em;vertical-align:middle}/*!\@.es-check>span*/.es-check.sc-upc-radio > span.sc-upc-radio{vertical-align:middle}/*!\@.es-check-input[disabled]*/.es-check-input[disabled].sc-upc-radio{border:2px solid var(--es-color-disabled)!important;background-color:var(--es-color-background)!important}/*!\@.es-check-input[disabled]:checked,.es-check-input[disabled][type=checkbox]:indeterminate*/.es-check-input[disabled].sc-upc-radio:checked, .es-check-input[disabled][type=checkbox].sc-upc-radio:indeterminate{background-color:var(--es-color-disabled)!important}');
styles.set('sc-upc-text','/*!\@.es-input-text*/.es-input-text.sc-upc-text{display:block;position:relative;font-size:var(--es-font-size-20);line-height:var(--es-line-height)}/*!\@.es-input-text.small*/.es-input-text.small.sc-upc-text{font-size:var(--es-font-size-16)}/*!\@.es-input-text.large*/.es-input-text.large.sc-upc-text{font-size:var(--es-font-size-24)}/*!\@.es-input-text>input*/.es-input-text.sc-upc-text > input.sc-upc-text{-webkit-appearance:none;background-color:transparent;border-color:var(--es-color-border);border-style:solid;border-width:0 0 2px;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:block;font:inherit;height:3.2em;margin:0;padding:1em 0 0;position:relative;vertical-align:text-bottom;width:100%}/*!\@.es-input-text>input:focus,.es-input-text>input:hover*/.es-input-text.sc-upc-text > input.sc-upc-text:focus, .es-input-text.sc-upc-text > input.sc-upc-text:hover{border-color:var(--es-color-foreground)}/*!\@.es-input-text>input+label,.es-input-text>input+span,.es-input-text>input:focus+label,.es-input-text>input:focus+span*/.es-input-text.sc-upc-text > input.sc-upc-text + label.sc-upc-text, .es-input-text.sc-upc-text > input.sc-upc-text + span.sc-upc-text, .es-input-text.sc-upc-text > input.sc-upc-text:focus + label.sc-upc-text, .es-input-text.sc-upc-text > input.sc-upc-text:focus + span.sc-upc-text{color:var(--es-color-theme1);display:block;font-size:var(--es-font-size-16);left:0;padding:0;position:absolute;top:0;white-space:nowrap;z-index:1;-webkit-transition:font-size var(--es-animation-hover),-webkit-transform var(--es-animation-hover);transition:font-size var(--es-animation-hover),-webkit-transform var(--es-animation-hover);transition:font-size var(--es-animation-hover),transform var(--es-animation-hover);transition:font-size var(--es-animation-hover),transform var(--es-animation-hover),-webkit-transform var(--es-animation-hover)}/*!\@.es-input-text>input:placeholder-shown+label,.es-input-text>input:placeholder-shown+span*/.es-input-text.sc-upc-text > input.sc-upc-text:placeholder-shown + label.sc-upc-text, .es-input-text.sc-upc-text > input.sc-upc-text:placeholder-shown + span.sc-upc-text{cursor:text;font-size:inherit;-webkit-transform:translateY(1.6em);transform:translateY(1.6em)}/*!\@.es-input-text>input:focus+label,.es-input-text>input:focus+span*/.es-input-text.sc-upc-text > input.sc-upc-text:focus + label.sc-upc-text, .es-input-text.sc-upc-text > input.sc-upc-text:focus + span.sc-upc-text{cursor:default;font-size:var(--es-font-size-16);-webkit-transform:translateY(0);transform:translateY(0)}/*!\@.es-input-text.error>input*/.es-input-text.error.sc-upc-text > input.sc-upc-text{border-color:var(--es-color-error-line)}/*!\@.es-input-text>div*/.es-input-text.sc-upc-text > div.sc-upc-text{color:var(--es-color-error-text)}');
styles.set('sc-upc-theme-primary','/*!\@:host*/.sc-upc-theme-primary-h{--es-animation-appear:0.3s;--es-animation-hover:0.3s;--es-animation-shift:0.2s;--es-color-background-rgb:255,255,255;--es-color-grey1-rgb:245,245,245;--es-color-grey2-rgb:235,235,235;--es-color-grey3-rgb:220,220,220;--es-color-grey4-rgb:185,185,185;--es-color-grey5-rgb:150,150,150;--es-color-grey6-rgb:115,115,115;--es-color-grey7-rgb:80,80,80;--es-color-grey8-rgb:46,46,46;--es-color-foreground-rgb:46,46,46;--es-color-petrol-blue-rgb:0,115,152;--es-color-blue-line-rgb:0,158,206;--es-color-blue-text-rgb:12,125,187;--es-color-green-line-rgb:41,166,27;--es-color-green-text-rgb:34,136,22;--es-color-orange-line-rgb:250,100,0;--es-color-orange-text-rgb:199,80,0;--es-color-purple-line-rgb:102,28,202;--es-color-purple-text-rgb:102,28,202;--es-color-red-line-rgb:247,62,41;--es-color-red-text-rgb:200,55,39;--es-color-background:rgb(var(--es-color-background-rgb));--es-color-blue-line:rgb(var(--es-color-blue-line-rgb));--es-color-blue-text:rgb(var(--es-color-blue-text-rgb));--es-color-foreground:rgb(var(--es-color-foreground-rgb));--es-color-green-line:rgb(var(--es-color-green-line-rgb));--es-color-green-text:rgb(var(--es-color-green-text-rgb));--es-color-grey1:rgb(var(--es-color-grey1-rgb));--es-color-grey2:rgb(var(--es-color-grey2-rgb));--es-color-grey3:rgb(var(--es-color-grey3-rgb));--es-color-grey4:rgb(var(--es-color-grey4-rgb));--es-color-grey5:rgb(var(--es-color-grey5-rgb));--es-color-grey6:rgb(var(--es-color-grey6-rgb));--es-color-grey7:rgb(var(--es-color-grey7-rgb));--es-color-grey8:rgb(var(--es-color-grey8-rgb));--es-color-orange-line:rgb(var(--es-color-orange-line-rgb));--es-color-orange-text:rgb(var(--es-color-orange-text-rgb));--es-color-petrol-blue:rgb(var(--es-color-petrol-blue-rgb));--es-color-purple-line:rgb(var(--es-color-purple-line-rgb));--es-color-purple-text:rgb(var(--es-color-purple-text-rgb));--es-color-red-line:rgb(var(--es-color-red-line-rgb));--es-color-red-text:rgb(var(--es-color-red-text-rgb));--es-color-border-rgb:var(--es-color-grey6-rgb);--es-color-disabled-rgb:var(--es-color-grey4-rgb);--es-color-error-line-rgb:var(--es-color-red-line-rgb);--es-color-error-text-rgb:var(--es-color-red-text-rgb);--es-color-focus-rgb:var(--es-color-orange-line-rgb);--es-color-link-rgb:var(--es-color-petrol-blue-rgb);--es-color-theme1-rgb:var(--es-color-petrol-blue-rgb);--es-color-theme2-rgb:var(--es-color-orange-line-rgb);--es-color-border:rgb(var(--es-color-border-rgb));--es-color-disabled:rgb(var(--es-color-disabled-rgb));--es-color-error-line:rgb(var(--es-color-error-line-rgb));--es-color-error-text:rgb(var(--es-color-error-text-rgb));--es-color-focus:rgb(var(--es-color-focus-rgb));--es-color-link:rgb(var(--es-color-link-rgb));--es-color-theme1:rgb(var(--es-color-theme1-rgb));--es-color-theme2:rgb(var(--es-color-theme2-rgb))}');
styles.set('sc-upc-theme-secondary','/*!\@:host*/.sc-upc-theme-secondary-h{--es-animation-appear:0.3s;--es-animation-hover:0.3s;--es-animation-shift:0.2s;--es-color-background-rgb:255,255,255;--es-color-grey1-rgb:245,245,245;--es-color-grey2-rgb:235,235,235;--es-color-grey3-rgb:220,220,220;--es-color-grey4-rgb:185,185,185;--es-color-grey5-rgb:150,150,150;--es-color-grey6-rgb:115,115,115;--es-color-grey7-rgb:80,80,80;--es-color-grey8-rgb:46,46,46;--es-color-foreground-rgb:46,46,46;--es-color-petrol-blue-rgb:0,115,152;--es-color-blue-line-rgb:0,158,206;--es-color-blue-text-rgb:12,125,187;--es-color-green-line-rgb:41,166,27;--es-color-green-text-rgb:34,136,22;--es-color-orange-line-rgb:250,100,0;--es-color-orange-text-rgb:199,80,0;--es-color-purple-line-rgb:102,28,202;--es-color-purple-text-rgb:102,28,202;--es-color-red-line-rgb:247,62,41;--es-color-red-text-rgb:200,55,39;--es-color-background:rgb(var(--es-color-background-rgb));--es-color-blue-line:rgb(var(--es-color-blue-line-rgb));--es-color-blue-text:rgb(var(--es-color-blue-text-rgb));--es-color-foreground:rgb(var(--es-color-foreground-rgb));--es-color-green-line:rgb(var(--es-color-green-line-rgb));--es-color-green-text:rgb(var(--es-color-green-text-rgb));--es-color-grey1:rgb(var(--es-color-grey1-rgb));--es-color-grey2:rgb(var(--es-color-grey2-rgb));--es-color-grey3:rgb(var(--es-color-grey3-rgb));--es-color-grey4:rgb(var(--es-color-grey4-rgb));--es-color-grey5:rgb(var(--es-color-grey5-rgb));--es-color-grey6:rgb(var(--es-color-grey6-rgb));--es-color-grey7:rgb(var(--es-color-grey7-rgb));--es-color-grey8:rgb(var(--es-color-grey8-rgb));--es-color-orange-line:rgb(var(--es-color-orange-line-rgb));--es-color-orange-text:rgb(var(--es-color-orange-text-rgb));--es-color-petrol-blue:rgb(var(--es-color-petrol-blue-rgb));--es-color-purple-line:rgb(var(--es-color-purple-line-rgb));--es-color-purple-text:rgb(var(--es-color-purple-text-rgb));--es-color-red-line:rgb(var(--es-color-red-line-rgb));--es-color-red-text:rgb(var(--es-color-red-text-rgb));--es-color-border-rgb:var(--es-color-grey6-rgb);--es-color-disabled-rgb:var(--es-color-grey4-rgb);--es-color-error-line-rgb:var(--es-color-red-line-rgb);--es-color-error-text-rgb:var(--es-color-red-text-rgb);--es-color-focus-rgb:var(--es-color-orange-line-rgb);--es-color-link-rgb:var(--es-color-petrol-blue-rgb);--es-color-theme1-rgb:var(--es-color-orange-text-rgb);--es-color-theme2-rgb:var(--es-color-petrol-blue-rgb);--es-color-border:rgb(var(--es-color-border-rgb));--es-color-disabled:rgb(var(--es-color-disabled-rgb));--es-color-error-line:rgb(var(--es-color-error-line-rgb));--es-color-error-text:rgb(var(--es-color-error-text-rgb));--es-color-focus:rgb(var(--es-color-focus-rgb));--es-color-link:rgb(var(--es-color-link-rgb));--es-color-theme1:rgb(var(--es-color-theme1-rgb));--es-color-theme2:rgb(var(--es-color-theme2-rgb))}');

exports.bootstrapHydrate = bootstrapHydrate;
