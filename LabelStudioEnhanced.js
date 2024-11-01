// ==UserScript==
// @name         Label Studio Enhanced Controls
// @namespace    https://github.com/TayLin99/LabelStudioEnhanced
// @version      2.0
// @description  Adds custom key controls and CSS modifications to Label Studio with toggle switches.
// @author       TayLin99
// @match        https://label.insta360.com/*
// @grant        none
// @require      https://raw.githubusercontent.com/TayLin99/LabelStudioEnhanced/refs/heads/main/LabelStudioEnhanced.js
// ==/UserScript==

(function() {
    'use strict';

    // 初始化开关变量
    let keyFrameSwitchFunction = 1;//键盘↔️，关键帧切换。0关闭，1开启。
    let frameSwitchFunction = 1;//键盘↕️，帧切换。0关闭，1开启。
    let playAndPauseButtonFunction = 1;//键盘空格键，播放/暂停。0关闭，1开启。
    let cssControl = 1;//CSS注入。0关闭，1开启

    // 监听键盘事件
    document.addEventListener('keydown', function(event) {
        if (keyFrameSwitchFunction) {
            if (event.key === "ArrowLeft") {
                let prevKeyFrameButton = document.evaluate('//*[@id="label-studio-dm"]/div/div[2]/div/div[1]/div[1]/div/div/div[1]/div[1]/div/div[3]/div[1]/div[1]/div[2]/div[2]/button[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (prevKeyFrameButton) {
                    prevKeyFrameButton.click();
                    event.preventDefault();
                }
            } else if (event.key === "ArrowRight") {
                let nextKeyFrameButton = document.evaluate('//*[@id="label-studio-dm"]/div/div[2]/div/div[1]/div[1]/div/div/div[1]/div[1]/div/div[3]/div[1]/div[1]/div[2]/div[2]/button[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (nextKeyFrameButton) {
                    nextKeyFrameButton.click();
                    event.preventDefault();
                }
            }
        }
        if (frameSwitchFunction) {
            if (event.key === "ArrowUp") {
                let prevFrameButton = document.evaluate('//*[@id="label-studio-dm"]/div/div[2]/div/div[1]/div[1]/div/div/div[1]/div[1]/div/div[3]/div[1]/div[1]/div[2]/div[2]/button[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (prevFrameButton) {
                    prevFrameButton.click();
                    event.preventDefault();
                }
            } else if (event.key === "ArrowDown") {
                let nextFrameButton = document.evaluate('//*[@id="label-studio-dm"]/div/div[2]/div/div[1]/div[1]/div/div/div[1]/div[1]/div/div[3]/div[1]/div[1]/div[2]/div[2]/button[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (nextFrameButton) {
                    nextFrameButton.click();
                    event.preventDefault();
                }
            }
        }
        if (playAndPauseButtonFunction) {
            if(event.code === "Space"){

                let playPauseButton = document.evaluate('//*[@id="label-studio-dm"]/div/div[2]/div/div[1]/div[1]/div/div/div[1]/div[1]/div/div[3]/div[1]/div[1]/div[2]/div[2]/button[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (playPauseButton) {
                    playPauseButton.click();
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
