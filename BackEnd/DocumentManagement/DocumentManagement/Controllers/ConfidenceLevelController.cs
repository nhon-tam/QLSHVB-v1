﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentManagement.BUS;
using DocumentManagement.FrameWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DocumentManagement.Controllers
{
    public class ConfidenceLevelController : BaseApiController
    {
        [HttpGet]
        public IActionResult GetAllConfidenceLevel()
        {
            ConfidenceLevelBUS confidenceLevelBUS = new ConfidenceLevelBUS();
            var result = confidenceLevelBUS.GetAllConfidenceLevel();
            return Ok(result);
        }
    }
}