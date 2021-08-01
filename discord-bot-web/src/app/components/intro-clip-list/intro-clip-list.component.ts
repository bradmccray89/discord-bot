import { Component, OnInit } from '@angular/core';
import { IntroClipService } from '../../services/intro-clip.service';

@Component({
  selector: 'app-intro-clip-list',
  templateUrl: './intro-clip-list.component.html',
  styleUrls: ['./intro-clip-list.component.css']
})
export class IntroClipListComponent implements OnInit {

  public audioClipList = [
    {
      name: 'Intro',
      audio: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      name: 'Intro 2',
      audio: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];
  public selectedClip: any;

  constructor(private introClipService: IntroClipService) { }

  ngOnInit(): void {
    this.introClipService.getAudioClips().subscribe((clips: any) => {
      console.log(clips);
      this.audioClipList = clips
    });
  }

}
