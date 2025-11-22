var imported = document.createElement('script');
var HostId = "ca-host-pub-6129580795478709";

var AdsenseId = "ca-pub-6129580795478709" ;
// Enter your AdSense ID. If you don't have an AdSense ID, leave this blank and enter the Channel ID below.

var ChannelId = "6347007127";
// Enter your Channel ID if you don't have an AdSense ID.

var adFrequency = "180s";

var testAdsOn = false; 
// Set to false when the game is ready to go live.

var activateAFP = false;
// Set to false if you are using the Channel ID instead of your AdSense ID.

window.adsbygoogle = window.adsbygoogle || [];
const adBreak = adConfig = function(o) {adsbygoogle.push(o);}
adConfig({
    preloadAdBreaks: 'on',
    sound: 'on', // This game has sound
    onReady: () => {
        console.log("ready");
    }, // Called when API has initialised and adBreak() is ready
});
function showNextAd()
{
    console.log("showNextAd")
    adBreak({
        type: 'next', // ad shows at start of next level
        name: 'next-game',
        beforeAd: () => {            
            console.log("beforeAd")
            passBeforeAdData()
        }, // You may also want to mute thegame's sound.
        afterAd: () => {
            console.log("afterAd")
            adBreakDoneData()
        }, // resume the game flow.
        adBreakDone: (placementInfo) => {
            console.log("adBreak complete ");
            console.log(placementInfo.breakType);
            console.log(placementInfo.breakName);
            console.log(placementInfo.breakFormat);
            console.log(placementInfo.breakStatus);
        },
    });
}

function showReward()
{
    console.log("showReward")
    adBreak({
        type: 'reward', // ad shows at start of next level
        name: 'rewarded Ad',
        beforeAd: () => {            
            console.log("beforeAd")
            passBeforeAdData()
        }, // You may also want to mute thegame's sound.
        afterAd: () => {
            console.log("afterAd")
        }, // resume the game flow.
        beforeReward: (showAdFn) => {console.log("beforeReward ")+showAdFn(0)},
        adDismissed: () => {console.log("adDismissed");cancelReward()},
        adViewed: () => {console.log("adViewed");gainReward()},
        adBreakDone: (placementInfo) => {
            console.log("adBreak complete ");
            console.log(placementInfo.breakType);
            console.log(placementInfo.breakName);
            console.log(placementInfo.breakFormat);
            console.log(placementInfo.breakStatus);
            if(placementInfo.breakStatus == "frequencyCapped"){noRewardAdsAvailable()};
            if(placementInfo.breakStatus == "other"){noRewardAdsAvailable()};
        },
    });
}
function noRewardAdsAvailable()
{
    console.log("noRewardAdsAvailable")
    myGameInstance.SendMessage('Canvas', 'NoRewardedAdsTryLater');
}

function cancelReward()
{
    console.log("cancelReward")
    myGameInstance.SendMessage('Canvas', 'resumeGameRewarded');
    myGameInstance.SendMessage('Canvas', 'rewardAdsCanceled');
}

function gainReward()
{
    console.log("gainReward")
    myGameInstance.SendMessage('Canvas', 'resumeGameRewarded');
    myGameInstance.SendMessage('Canvas', 'rewardAdsCompleted');
}

function passBeforeAdData() 
{
    myGameInstance.SendMessage('Canvas', 'pauseGame');
}

function adBreakDoneData()
{
    myGameInstance.SendMessage('Canvas', 'resumeGame');
}

function createAFGScript()
{
	console.log("createAFGScript")
	if(activateAFP == true){imported.setAttribute('data-ad-host', HostId)};
    imported.setAttribute('data-ad-client', AdsenseId);
	if(activateAFP == false){imported.setAttribute('data-ad-channel', ChannelId)};
    imported.setAttribute('data-ad-frequency-hint', adFrequency);
    if(testAdsOn == true){imported.setAttribute('data-adbreak-test', "on");}
    imported.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    imported.setAttribute("type", "text/javascript");
    imported.async = true;
    document.head.appendChild(imported);
}

createAFGScript()
