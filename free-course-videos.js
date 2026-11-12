// Add video links later. Order: module 1 through module 9.
// Use a local .mp4/.webm file path or a YouTube/Vimeo EMBED URL.
// Examples: media/teaching-01.mp4 or https://www.youtube-nocookie.com/embed/VIDEO_ID
// Blank entries display the supplied image and written learning, without a video player.
window.SS_FREE_VIDEOS={
  11: ['', '', '', '', '', '', '', '', ''], // Five-hour teaching course
  12: ['', '', '', '', '', '', '', '', '']  // Two-hour safety course
};
for(const [id,links] of Object.entries(window.SS_FREE_VIDEOS)){
 links.forEach((url,index)=>{if(window.SS_CONTENT[id]?.modules[index])window.SS_CONTENT[id].modules[index].video=url;});
}
