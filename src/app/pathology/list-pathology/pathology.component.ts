import { Component, OnInit } from "@angular/core";
import { PathologyService } from "../../_services/pathology.service";

@Component({
  selector: "app-pathologyList",
  templateUrl: "./pathology.component.html",
  styleUrls: ["./pathology.component.css"]
})

export class PathologyComponent implements OnInit {
  pathologies: any[] = [];
  error: string | null = null;

  constructor(private pathologyService: PathologyService) {}

  ngOnInit(): void {
    this.loadPathologies();
  }

  loadPathologies(): void {
    this.pathologyService.getAllPathologies().subscribe({
      next: (data) => {
        this.pathologies = data;
      },
      error: (err) => {
        this.error = "Error loading pathologies";
        console.error(err);
      }
    });
  }
}