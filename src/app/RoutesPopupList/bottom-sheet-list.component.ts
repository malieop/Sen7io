import {Component} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

/**
 * @title Bottom Sheet Overview
 */
@Component({
  selector: 'app-bottom-sheet-list-component',
  templateUrl: './bottom-sheet-list.component.html',
  styleUrls: ['./bottom-sheet-list.component.css'],
})
export class BottomSheetOverviewComponent {
  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewListSheetComponent);
  }
}

@Component({
  selector: 'app-bottom-sheet-list-sheet-component',
  templateUrl: './bottom-sheet-list-sheet.component.html',
})
export class BottomSheetOverviewListSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewListSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
