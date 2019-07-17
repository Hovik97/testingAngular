import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Global } from '../globals';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
  public allFile = [];
  public isTrue: boolean = true;
  public arrDataRep = {trueArr: [], falseArr: []};
  private filesUpload;
  constructor(public global: Global,
              private reportService: ReportService) { }

  ngOnInit() {
  }

  allFiles(e) {
    this.allFile = [];
    for(let key in e.target.files) {
      if(e.target.files.hasOwnProperty(key)) {
        if(this.compaerFileFormat(e.target.files[key])) {
          this.allFile.push(e.target.files[key])
        } else {
            alert('duq karox eq nerbernel miayn pdf kam exel formati filer voronq et formati chi ev vor filery standartnerin chi hamapatasxanum jnjvuma');
        }
      }
    }
  }

  compaerFileFormat(e) {
    const a = e.name.lastIndexOf('.');
    const b = e.name.substring(a + 1);
    switch (b) {
      case 'pdf':
      case 'xlsx':
      case 'xls':
      case 'csv':
        return true;
      default:
        return false;
    }
  }

  addReportsSup() {
    const arrFiles = [];
    if (this.allFile.length > 0) {
      this.filesUpload = new FormData();
      this.allFile.map(file => arrFiles.push(file));
      if (arrFiles.length > 60) {
        alert('duq cheq karox 15 ic avel file ogtagrcel');
        return;
      }
      arrFiles.map(file => this.filesUpload.append('files', file, file.name));
      this.global.loader = true;
      this.filesUpload.append('userID', this.global.authenticationUser._id);
      this.filesUpload.append('borrowerName', this.global.authenticationUser.name + ' ' + this.global.authenticationUser.surname);
      this.filesUpload.append('companyID', this.global.authenticationUser.companyID);
      this.reportService.createReport(this.filesUpload).subscribe((res: any) => {
        this.filesUpload.delete('files');
        this.filesUpload.delete('userID');
        this.filesUpload.delete('borrowerName');
        this.filesUpload.delete('companyID');
        this.global.loader = false;
        this.isTrue = false;
        this.compareFile(res.arrExel, res.arrPdf);
      });
    }
  }

  compareFile(exel, pdf) {
    pdf.map((file, i) => {
      let isTrue = true;
      exel.map((csv, ind) => {
        Object.keys(csv).length === 0 ? exel.splice(ind, 1) : '';
        if(file.acra_Report_ID === csv.acra_Report_ID) {
          this.arrDataRep.trueArr.push([file, csv]);
          exel.splice(ind, 1);
          ind--;
          isTrue = false;
        }
      });
      if(isTrue) {
        Object.keys(file).length !== 0 ? this.arrDataRep.falseArr.push([file, null]) : '';
      }
    });
    exel.map(ex => this.arrDataRep.falseArr.push([null, ex]));
  }

  uploadNewFiles(e, i, form) {
    let count = 0;
    let fileList: FileList = this.CloneObject(e.target.files[0]);
    const a = e.target.value.lastIndexOf('.');
    const b = e.target.value.substring(a + 1);
    (b === form && form === 'pdf') ? this.arrDataRep.falseArr[i][0] = fileList : count++;
    (form === 'exel' && (b === 'xlsx' || b === 'xls' || b === 'csv')) ? this.arrDataRep.falseArr[i][1] = fileList : count++;
    count === 2 ? alert(`duq petq e nerberneq ${form} tesaki file`) : '';
  }

  CloneObject(e) {
    return Object.assign(e, {filename: e.name});
  }

  changeFileData(i) {
    let def;
    let newFile;
    this.filesUpload = new FormData();
    this.arrDataRep.falseArr[i].map((file, index) => {
      if('type' in file) {
        this.filesUpload.append('files', file, file.name)
        index === 0 ? def = this.arrDataRep.falseArr[i][1] : def = this.arrDataRep.falseArr[i][0];
      }
    });
    this.global.loader = true;
    this.filesUpload.append('userID', this.global.authenticationUser._id);
    this.filesUpload.append('borrowerName', this.global.authenticationUser.name + ' ' + this.global.authenticationUser.surname);
    this.filesUpload.append('companyID', this.global.authenticationUser.companyID);
    this.reportService.createReport(this.filesUpload).subscribe((res: any) => {
      this.filesUpload.delete('files');
      this.filesUpload.delete('userID');
      this.filesUpload.delete('borrowerName');
      this.filesUpload.delete('companyID');
      this.global.loader = false;
      if(res.arrExel.length > 0) {
        newFile = res.arrExel[0];
      } else {
          newFile = def;
          def = res.arrPdf[0];
      }
      this.compareOneFile(newFile, def, i);
    });
  }

  compareOneFile(exel, pdf, i) {
    if (exel.acra_Report_ID === pdf.acra_Report_ID) {
      this.arrDataRep.trueArr.push([pdf, exel]);
      this.arrDataRep.falseArr.splice(i, 1);
    } else {
      if('type' in this.arrDataRep.falseArr[i][0]){
        this.arrDataRep.falseArr[i][0] = null
      } else {
          this.arrDataRep.falseArr[i][1] = null;
      }
    }
  }

  deleteFiles(i) {
    const isTrue = confirm('duq karox eq nor file bernel ev verifikacneq hastat uzumeq jnjeq?');
    isTrue ? this.arrDataRep.falseArr.splice(i, 1) : '';
  }

  nameFile(arr) {
    return arr[0] ? `${arr[0].first_name} ${arr[0].last_name}` : `${arr[1].first_name} ${arr[1].last_name}`
  }

  next() {
    console.log(this.arrDataRep.trueArr)
  }

}
