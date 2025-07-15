import { Component, EventEmitter, Input, Output,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {



  @Input() subcategories: string[] | null = null;

  @Output() categoryChange = new EventEmitter<string>();
  @Output() subcategoryChange = new EventEmitter<string>();

  selectedCategory = 'catering';
  selectedSubcategory = '';

  categories = [
    { key: 'catering', name: 'CATERING' },
    { key: 'sadya', name: 'SADYA' },
    { key: 'events', name: 'EVENTS' }
  ];

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedSubcategory = '';
    this.categoryChange.emit(category);
  }

  selectSubcategory(subcategory: string): void {
    this.selectedSubcategory = subcategory;
    this.subcategoryChange.emit(subcategory);
  }

  
}
