import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userArr: any[] = [];
  user: any = {
    userName: "",
    time: "",
    activity: ""
  };
  filterName: string = "";
  filterActivity: string = "";
  currentPage = 1;
  itemsPerPage = 5;

  selectedUser: string = "";
  chart: any;
  chartConfig: any = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Time (Minutes)',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  ngOnInit(): void {
    const localData = localStorage.getItem("userData");
    if (localData != null) {
      this.userArr = JSON.parse(localData);
    }
    this.initializeChart();
    if (this.userArr.length > 0) {
      this.selectedUser = this.userArr[0].userName;
      this.updateChart();
    }
  }

  Add(): void {
    if (this.user.userName && this.user.time && this.user.activity) {
      const existingUser = this.userArr.find(u => u.userName === this.user.userName);
      if (existingUser) {
        existingUser.time = Number(existingUser.time) + Number(this.user.time);
        existingUser.activity += `, ${this.user.activity}`;
      } else {
        this.userArr.push({ ...this.user });
      }
      localStorage.setItem("userData", JSON.stringify(this.userArr));
      this.user = { userName: "", time: "", activity: "" };
      this.updateChart();
    } else {
      alert('Please fill out all fields');
    }
  }

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    console.log(value);
  }

  onUserChange(): void {
    this.updateChart();
  }

  paginatedData(): any[] {
    let filteredData = this.userArr;
    if (this.filterName) {
      filteredData = filteredData.filter(item => item.userName.toLowerCase().includes(this.filterName.toLowerCase()));
    }
    if (this.filterActivity) {
      filteredData = filteredData.filter(item => item.activity.toLowerCase().includes(this.filterActivity.toLowerCase()));
    }
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filteredData.slice(start, end);
  }

  totalPages(): number {
    let filteredData = this.userArr;
    if (this.filterName) {
      filteredData = filteredData.filter(item => item.userName.toLowerCase().includes(this.filterName.toLowerCase()));
    }
    if (this.filterActivity) {
      filteredData = filteredData.filter(item => item.activity.toLowerCase().includes(this.filterActivity.toLowerCase()));
    }
    return Math.ceil(filteredData.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  initializeChart(): void {
    const ctx = document.getElementById('MyChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, this.chartConfig);
  }

  updateChart(): void {
    const selectedUser = this.userArr.find(user => user.userName === this.selectedUser);
    if (selectedUser) {
      const activities = selectedUser.activity.split(', ');
      const times = Array(activities.length).fill(selectedUser.time / activities.length); // Averaging time across activities

      this.chart.data.labels = activities;
      this.chart.data.datasets[0].data = times;
    } else {
      this.chart.data.labels = [];
      this.chart.data.datasets[0].data = [];
    }
    this.chart.update();
  }
}
