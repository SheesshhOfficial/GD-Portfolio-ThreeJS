from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
import shutil

root = Path(__file__).resolve().parents[1]
dest = root / 'output/pdf/ashish-ranjan-profile.pdf'
dest.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(dest), pagesize=(595.28, 841.89))
c.setTitle('Ashish Ranjan - Game Development Profile')
c.setAuthor('Ashish Ranjan')
c.setFillColor(HexColor('#f3f3e9')); c.rect(0, 0, 595.28, 841.89, fill=1, stroke=0)
c.setFillColor(HexColor('#34472d')); c.rect(40, 767, 4, 36, fill=1, stroke=0)
c.setFillColor(HexColor('#303c2b')); c.setFont('Helvetica-Bold', 29); c.drawString(58, 778, 'Ashish Ranjan')
c.setFont('Helvetica', 11); c.drawString(58, 757, 'GAME DEVELOPMENT / GAMEPLAY SYSTEMS / TECHNICAL ART')
c.setFont('Helvetica', 9); c.drawString(42, 727, 'Bengaluru, India  |  ashish.mitblr2023@learner.manipal.edu')
c.linkURL('mailto:ashish.mitblr2023@learner.manipal.edu', (152, 722, 445, 737), relative=0)
c.drawString(42, 709, 'github.com/SheesshhOfficial  |  linkedin.com/in/sheesshh')
c.linkURL('https://github.com/SheesshhOfficial', (42, 704, 219, 718), relative=0)
c.linkURL('https://www.linkedin.com/in/sheesshh/', (228, 704, 458, 718), relative=0)
y = 675

def section(title):
    global y
    c.setStrokeColor(HexColor('#c5cdb7')); c.line(42, y + 5, 553, y + 5)
    c.setFillColor(HexColor('#50693d')); c.setFont('Helvetica-Bold', 10); c.drawString(42, y - 13, title.upper())
    y -= 35

def paragraph(text, bold=False, size=10):
    global y
    font = 'Helvetica-Bold' if bold else 'Helvetica'
    c.setFont(font, size); c.setFillColor(HexColor('#3f4938'))
    for line in simpleSplit(text, font, size, 510):
        c.drawString(42, y, line); y -= 15
    y -= 8

section('Profile')
paragraph('Computer Science & Engineering undergraduate with a focus on Unreal Engine gameplay systems and technical art. Interested in game-development opportunities and freelance project conversations.')
section('Tools and areas of focus')
paragraph('Unreal Engine 5, C++, Blueprints, Enhanced Input, Git and Blender. Areas of study include networked gameplay, character interaction, combat and round flow, animation assets, and 3D content pipelines.')
section('Selected project studies - Sheeshh Prop Hunt')
paragraph('Unreal Engine multiplayer hide-and-seek project', bold=True)
paragraph('Prop transformation: inspected Blueprint logic includes target selection, server-side resource checks, multicast mesh updates, and fixed pivot offsets for selected meshes.')
paragraph('Gameplay systems: portfolio studies cover decoy placement, weapon traces and damage, spectator transitions, round lifecycle, spatial taunts, VOIP packet clearing, and character customization.')
paragraph('Technical art: project files include IK Rig, IK Retargeter, and physics assets. Internal setup, motion quality, and original asset authorship require further documentation.')
section('Education')
paragraph('Manipal Institute of Technology, Bengaluru', bold=True)
paragraph('B.Tech in Computer Science & Engineering - Expected graduation: 2027')
section('Evidence and contribution note')
paragraph('This profile summarizes supplied background and inspected project studies. Blueprint/source inspection establishes implementation structure, not runtime reliability. Individual contributions, third-party credits, and gameplay recordings will accompany the final case studies.', size=9)
c.setFillColor(HexColor('#7d8b70')); c.setFont('Helvetica', 8)
c.drawString(42, 38, 'Portfolio profile - prepared 11 October 2026')
c.drawRightString(553, 38, '1 / 1')
if y < 60:
    raise RuntimeError('Profile exceeds page-safe layout')
c.showPage(); c.save()
public = root / 'public/portfolio-media/ashish-ranjan-profile.pdf'
public.parent.mkdir(parents=True, exist_ok=True)
shutil.copyfile(dest, public)
print(f'Created {dest}; final content y={y}')
