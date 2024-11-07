// ==UserScript==
// @name         Label Studio Panoramic Enhanced
// @namespace    https://github.com/TayLin99/LabelStudioEnhanced
// @version      3.1
// @description  全景标注操作增强：快捷键、样式修改
// @author       TayLin99
// @match        https://label.insta360.com/*
// @grant        none
// @require      https://raw.githubusercontent.com/TayLin99/LabelStudioEnhanced/refs/heads/main/LabelStudioPanoramicEnhanced.js
// ==/UserScript==

(function() {
    'use strict';

    // 初始化开关变量
    let cameraMovementKeyFrameHotKey = 0;//键盘↔️，关键帧切换。0关闭，1开启。
    // 当前解决方法不完美，所以关掉了
    
    let annotationPanel = 1;//键盘↕️，帧切换。0关闭，1开启。
    let playAndPauseButtonFunction = 1;//键盘空格键，播放/暂停。0关闭，1开启。
    let cssControl = 1;//CSS注入。0关闭，1开启

    // 监听键盘事件
    document.addEventListener('keydown', function(event) {
        if (cameraMovementKeyFrameHotKey) {
            if (event.key === "ArrowLeft") {
                let amPrevKeyFrame = document.evaluate('//div=[@class="keyframe-btns__item"][1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (amPrevKeyFrame) {
                    amPrevKeyFrame.click();
                    event.preventDefault();
                }
            } else if (event.key === "ArrowRight") {
                let amNextKeyFrame = document.evaluate('//div=[@class="keyframe-btns__item"][3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (amNextKeyFrame) {
                    amNextKeyFrame.click();
                    event.preventDefault();
                }
            }
        }
        if (annotationPanel) {
            if (event.key === "ArrowUp") {
                let aPrevFrame = document.evaluate('//div[@class="lsf-timeline-controls__main-controls"]//div[2]/button[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (aPrevFrame) {
                    aPrevFrame.click();
                    event.preventDefault();
                }
            } else if (event.key === "ArrowDown") {
                let aNextFrame = document.evaluate('//div[@class="lsf-timeline-controls__main-controls"]//div[2]/button[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (aNextFrame) {
                    aNextFrame.click();
                    event.preventDefault();
                }
            }
        }
        if (playAndPauseButtonFunction) {
            if(event.code === "Space"){

                let aPlayPauseButton = document.evaluate('//div[@class="lsf-timeline-controls__main-controls"]//div[2]/button[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (aPlayPauseButton) {
                    aPlayPauseButton.click();
                }
                event.preventDefault();
            }
        }
    });

    // 注入 CSS 的函数
    function injectCSS() {
        const style = document.createElement('style');
        style.textContent = `.lil-gui.root.allow-touch-styles.autoPlace { opacity: 0.6!important; } div.lsf-main-content > div > div > div:nth-child(1) > h4{ display: none!important; } div.dm-table__row-wrapper:hover{ background-color:#08b1f7!important; } div.dm-table__row-wrapper_selected{ background-color: #6bd0fa!important; } div.dm-table_row-wrapper:active{ background-color: rgb(0, 171, 255)!important; } #label-studio-dm > div > div.lsf-wrapper.lsf-wrapper_outliner.lsf-wrapper_showingBottomBar > div > div.lsf-tabs-panel.lsf-tabs-panel_detached.lsf-tabs-panel_alignment_left{ opacity: 0.6!important; }`;
        document.head.appendChild(style);
    }

    // 根据开关控制 CSS 的注入
    if (cssControl) {
        injectCSS();
    }
})();
